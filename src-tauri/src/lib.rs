use std::fs::{self, File};
use std::io::{Cursor, Read};
use std::path::{Path, PathBuf};

use serde::Serialize;
use tauri::Manager;
use tauri_plugin_fs::FsExt;
use zip::ZipArchive;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ImportSummary {
    creature_count: usize,
    image_count: usize,
}

#[tauri::command]
async fn import_creature_package(
    app: tauri::AppHandle,
    archive: Vec<u8>,
) -> Result<ImportSummary, String> {
    let base_dir = app
        .path()
        .app_data_dir()
        .map_err(|err| err.to_string())?;

    tauri::async_runtime::spawn_blocking(move || import_archive(base_dir, archive))
        .await
        .map_err(|err| err.to_string())?
}

fn import_archive(base_dir: PathBuf, archive: Vec<u8>) -> Result<ImportSummary, String> {
    let data_path = base_dir.join("creatureData.json");
    let images_root = base_dir.join("images");
    let creatures_dir = images_root.join("creatures");
    let spotify_dir = images_root.join("spotify");

    fs::create_dir_all(&creatures_dir).map_err(|err| err.to_string())?;
    fs::create_dir_all(&spotify_dir).map_err(|err| err.to_string())?;

    let cursor = Cursor::new(archive);
    let mut zip = ZipArchive::new(cursor).map_err(|err| err.to_string())?;

    let mut json_contents: Option<String> = None;
    let mut creature_count = 0usize;
    let mut image_count = 0usize;

    for i in 0..zip.len() {
        let mut entry = zip.by_index(i).map_err(|err| err.to_string())?;
        if entry.is_dir() {
            continue;
        }

        // Skip macOS metadata folders
        if entry.name().starts_with("__MACOSX/") {
            continue;
        }

        let Some(path) = entry.enclosed_name().map(Path::to_path_buf) else {
            continue;
        };

        if is_creature_data(&path) {
            let mut contents = String::new();
            entry
                .read_to_string(&mut contents)
                .map_err(|err| err.to_string())?;

            let parsed: serde_json::Value =
                serde_json::from_str(&contents).map_err(|err| err.to_string())?;
            creature_count = parsed["regions"]
                .as_array()
                .map(|regions| {
                    regions
                        .iter()
                        .map(|region| {
                            region["creatures"]
                                .as_array()
                                .map(|creatures| creatures.len())
                                .unwrap_or_default()
                        })
                        .sum()
                })
                .unwrap_or_default();

            json_contents = Some(contents);
            continue;
        }

        if let Some(target) = resolve_asset_path(&path, &creatures_dir, &spotify_dir) {
            if let Some(parent) = target.parent() {
                fs::create_dir_all(parent).map_err(|err| err.to_string())?;
            }

            let mut output = File::create(&target).map_err(|err| err.to_string())?;
            std::io::copy(&mut entry, &mut output).map_err(|err| err.to_string())?;
            image_count += 1;
        }
    }

    let contents = json_contents.ok_or_else(|| {
        "Archive did not include a creatureData.json at the root level.".to_string()
    })?;

    fs::write(&data_path, contents).map_err(|err| err.to_string())?;

    Ok(ImportSummary {
        creature_count,
        image_count,
    })
}

fn is_creature_data(path: &Path) -> bool {
    if path
        .file_name()
        .map(|name| name.eq_ignore_ascii_case("creaturedata.json"))
        .unwrap_or(false)
    {
        return path.components().count() == 1;
    }

    false
}

fn resolve_asset_path(
    path: &Path,
    creatures_dir: &Path,
    spotify_dir: &Path,
) -> Option<PathBuf> {
    let segments: Vec<String> = path
        .iter()
        .map(|segment| segment.to_string_lossy().to_string())
        .collect();

    if segments.is_empty() {
        return None;
    }

    let first = segments[0].to_ascii_lowercase();

    if first == "creature" || first == "creatures" {
        if segments.len() < 2 {
            return None;
        }
        return Some(join_segments(creatures_dir, &segments[1..]));
    }

    if first == "spotify" {
        if segments.len() < 2 {
            return None;
        }
        return Some(join_segments(spotify_dir, &segments[1..]));
    }

    if first == "images" && segments.len() >= 3 {
        let second = segments[1].to_ascii_lowercase();
        let remainder = &segments[2..];
        if remainder.is_empty() {
            return None;
        }

        if second == "creatures" || second == "creature" {
            return Some(join_segments(creatures_dir, remainder));
        }
        if second == "spotify" {
            return Some(join_segments(spotify_dir, remainder));
        }
    }

    None
}

fn join_segments(base: &Path, segments: &[String]) -> PathBuf {
    let mut path = base.to_path_buf();
    for segment in segments {
        if segment.is_empty() {
            continue;
        }
        path.push(segment);
    }
    path
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![import_creature_package])
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            // allowed the given directory
            let scope = app.fs_scope();
            let _ = scope.allow_directory("$HOME", false);

            if let Ok(app_data_dir) = app.path().app_data_dir() {
                if let Some(path_str) = app_data_dir.to_str() {
                    let _ = scope.allow_directory(path_str, true);
                    let asset_scope = app.asset_protocol_scope();
                    let _ = asset_scope.allow_directory(path_str, true);
                }
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
