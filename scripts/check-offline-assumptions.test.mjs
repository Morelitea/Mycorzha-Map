/**
 * That the guard fails when an assumption breaks.
 *
 * A check that only ever passes is indistinguishable from one that asserts
 * nothing, and this one passes on the tree as it stands — so each way of
 * breaking it is exercised against a copy.
 *
 * Run: node scripts/check-offline-assumptions.test.mjs
 */

import {cpSync, mkdtempSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';

const CHECK = 'scripts/check-offline-assumptions.mjs';

function sandbox() {
  const dir = mkdtempSync(join(tmpdir(), 'offline-check-'));
  mkdirSync(join(dir, 'scripts'), {recursive: true});
  mkdirSync(join(dir, 'src-tauri'), {recursive: true});
  cpSync(CHECK, join(dir, CHECK));
  cpSync('src-tauri/tauri.conf.json', join(dir, 'src-tauri/tauri.conf.json'));
  cpSync('package.json', join(dir, 'package.json'));
  cpSync('src', join(dir, 'src'), {recursive: true});
  // The Rust half, where network access is enabled: a crate in Cargo.toml and
  // a permission in a capability file. The sandbox needs both to exercise the
  // whole assumption.
  cpSync('src-tauri/Cargo.toml', join(dir, 'src-tauri/Cargo.toml'));
  cpSync('src-tauri/src', join(dir, 'src-tauri/src'), {recursive: true});
  cpSync('src-tauri/capabilities', join(dir, 'src-tauri/capabilities'), {recursive: true});
  return dir;
}

function run(dir) {
  try {
    execFileSync('node', [CHECK], {cwd: dir, encoding: 'utf8', stdio: 'pipe'});
    return {ok: true, output: ''};
  } catch (error) {
    return {ok: false, output: `${error.stdout ?? ''}${error.stderr ?? ''}`};
  }
}

function editConfig(dir, change) {
  const path = join(dir, 'src-tauri/tauri.conf.json');
  const config = JSON.parse(readFileSync(path, 'utf8'));
  change(config);
  writeFileSync(path, JSON.stringify(config, null, 2));
}

let failures = 0;
function expectFails(label, prepare, expected) {
  const dir = sandbox();
  prepare(dir);
  const {ok, output} = run(dir);
  if (ok) {
    console.error(`FAIL: ${label} — the check passed and should not have`);
    failures += 1;
  } else if (expected && !output.includes(expected)) {
    console.error(`FAIL: ${label} — did not mention "${expected}"`);
    failures += 1;
  } else {
    console.log(`ok: ${label}`);
  }
}

// Passes as things stand. Without this, every case below could be passing for
// the wrong reason.
{
  const {ok} = run(sandbox());
  if (!ok) {
    console.error('FAIL: the check does not pass on an unmodified tree');
    failures += 1;
  } else {
    console.log('ok: passes on an unmodified tree');
  }
}

expectFails('an updater is configured', (dir) =>
  editConfig(dir, (config) => {
    config.plugins = {...(config.plugins ?? {}), updater: {endpoints: ['https://u.example']}};
  }), 'updater');

expectFails('a window loads remote content', (dir) =>
  editConfig(dir, (config) => {
    config.app.windows[0].url = 'https://example.test/map';
  }), 'remote url');

expectFails('the source fetches something', (dir) =>
  writeFileSync(join(dir, 'src/added.ts'), 'export const go = () => fetch("/x");\n'),
  'outbound request');

expectFails('the source names a remote host', (dir) =>
  writeFileSync(join(dir, 'src/added.ts'), 'export const HOST = "https://tiles.example.test";\n'),
  'remote url');

expectFails('the http plugin is added', (dir) => {
  const path = join(dir, 'package.json');
  const pkg = JSON.parse(readFileSync(path, 'utf8'));
  pkg.dependencies['@tauri-apps/plugin-http'] = '^2.0.0';
  writeFileSync(path, JSON.stringify(pkg, null, 2));
}, 'plugin-http');

// The Rust half. `@tauri-apps/plugin-http` in package.json is the optional
// JavaScript binding; the crate and the capability grant are what enable the
// plugin, and Rust reaches the network with no Tauri plugin at all.

expectFails('a network crate is added to Cargo.toml', (dir) => {
  const path = join(dir, 'src-tauri/Cargo.toml');
  writeFileSync(path, readFileSync(path, 'utf8') + '\nreqwest = { version = "0.12" }\n');
}, 'reqwest');

expectFails('the http plugin crate is added to Cargo.toml', (dir) => {
  const path = join(dir, 'src-tauri/Cargo.toml');
  writeFileSync(path, readFileSync(path, 'utf8') + '\ntauri-plugin-http = "2"\n');
}, 'tauri-plugin-http');

expectFails('a capability grants the http permission', (dir) => {
  const path = join(dir, 'src-tauri/capabilities/default.json');
  const capability = JSON.parse(readFileSync(path, 'utf8'));
  capability.permissions.push('http:default');
  writeFileSync(path, JSON.stringify(capability, null, 2));
}, 'http:default');

expectFails('the rust source names a remote host', (dir) =>
  writeFileSync(
    join(dir, 'src-tauri/src/added.rs'),
    'pub const HOST: &str = "https://tiles.example.test";\n',
  ),
  'remote url');

if (failures > 0) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log('\nall checks passed');
