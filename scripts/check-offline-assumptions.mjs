/**
 * The conditions this app's security posture is accepted under.
 *
 * Mycorzha Map runs as an offline convention display. On that basis the wide
 * IPC surface was accepted rather than narrowed, with one condition attached:
 * revisit before adding remote content, network connectivity, or an update
 * channel.
 *
 * That condition was a sentence in a review. This is the same sentence as a
 * check, so the day one of those arrives is the day somebody is told, rather
 * than the day somebody happens to re-read the review.
 *
 * It asserts the ASSUMPTIONS, not a hardening posture. Nothing here asks the
 * app to be locked down — that was considered and deliberately not done. What
 * it refuses to let happen quietly is the ground shifting underneath that
 * decision.
 *
 * Run: node scripts/check-offline-assumptions.mjs
 */

import {readFileSync, readdirSync, statSync} from 'node:fs';
import {join, extname} from 'node:path';

const CONFIG = 'src-tauri/tauri.conf.json';
const SOURCE_ROOT = 'src';
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);

/** Hosts that are not network access: schema references and documentation. */
const NOT_NETWORK = [
  'https://schema.tauri.app',
  'http://www.w3.org',
  'https://www.w3.org',
];

const findings = [];
const notes = [];

function sourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (SOURCE_EXTENSIONS.has(extname(entry))) out.push(full);
  }
  return out;
}

const config = JSON.parse(readFileSync(CONFIG, 'utf8'));

// 1. An update channel. Reaching out for a new version is network access, and
//    it is the specific case the acceptance named.
if (config.plugins?.updater || config.bundle?.createUpdaterArtifacts) {
  findings.push(`${CONFIG}: an updater is configured`);
}

// 2. Remote content in the window. `frontendDist` is the bundle; a devUrl is
//    the development server and is not what ships.
const windows = config.app?.windows ?? [];
for (const [index, window] of windows.entries()) {
  if (window.url && /^https?:/i.test(window.url)) {
    findings.push(`${CONFIG}: window ${index} loads a remote url (${window.url})`);
  }
}

// 3. Network access from the app itself.
for (const file of sourceFiles(SOURCE_ROOT)) {
  const source = readFileSync(file, 'utf8');
  for (const [lineNumber, line] of source.split('\n').entries()) {
    const url = line.match(/https?:\/\/[^\s'"`)]+/);
    if (url && !NOT_NETWORK.some((allowed) => url[0].startsWith(allowed))) {
      findings.push(`${file}:${lineNumber + 1}: a remote url (${url[0]})`);
    }
    if (/\bfetch\s*\(|\bXMLHttpRequest\b|new WebSocket\(/.test(line)) {
      findings.push(`${file}:${lineNumber + 1}: an outbound request`);
    }
  }
}

// 4. The http plugin is network access by definition.
const deps = JSON.parse(readFileSync('package.json', 'utf8')).dependencies ?? {};
if (deps['@tauri-apps/plugin-http']) {
  findings.push('package.json: @tauri-apps/plugin-http is a dependency');
}

// Recorded, not failed. These describe how wide the surface is, which is the
// thing that was accepted — printing them keeps the acceptance honest without
// turning a decision somebody made into a failing build.
if (config.app?.security?.csp == null) {
  notes.push('no Content-Security-Policy is set (security.csp is null)');
}
if (config.app?.withGlobalTauri) {
  notes.push('withGlobalTauri is true: the API is reachable as window.__TAURI__');
}

for (const note of notes) console.log(`note: ${note}`);

if (findings.length > 0) {
  console.error('\nThe offline assumption no longer holds:\n');
  for (const finding of findings) console.error(`  - ${finding}`);
  console.error(
    '\nThe IPC surface was left wide because this ships as an offline display.\n' +
      'Any of the above changes that. Re-examine the posture before shipping,\n' +
      'then update this check to match what was decided.\n',
  );
  process.exit(1);
}

console.log(`\nok: offline assumption holds (${windows.length} window(s), no network access found)`);
