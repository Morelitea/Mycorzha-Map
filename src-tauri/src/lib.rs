use std::fs::{self, File};
use std::io::{Cursor, Read};
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tauri::Manager;
use tauri_plugin_fs::FsExt;
use zip::ZipArchive;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ImportSummary {
    creature_count: usize,
    image_count: usize,
}

#[derive(Debug, Deserialize)]
struct CreatureFile {
    id: Option<String>,
    region_id: Option<String>,
    #[serde(flatten)]
    rest: serde_json::Map<String, serde_json::Value>,
}

#[tauri::command]
async fn import_creature_package(
    app: tauri::AppHandle,
    archive: Vec<u8>,
) -> Result<ImportSummary, String> {
    let base_dir = app.path().app_data_dir().map_err(|err| err.to_string())?;

    tauri::async_runtime::spawn_blocking(move || import_archive(base_dir, archive))
        .await
        .map_err(|err| err.to_string())?
}

fn import_archive(base_dir: PathBuf, archive: Vec<u8>) -> Result<ImportSummary, String> {
    let data_root = base_dir.join("creatures");
    let images_root = base_dir.join("images");
    let creatures_dir = images_root.join("creatures");
    let spotify_dir = images_root.join("spotify");

    fs::create_dir_all(&data_root).map_err(|err| err.to_string())?;
    fs::create_dir_all(&creatures_dir).map_err(|err| err.to_string())?;
    fs::create_dir_all(&spotify_dir).map_err(|err| err.to_string())?;

    let cursor = Cursor::new(archive);
    let mut zip = ZipArchive::new(cursor).map_err(|err| err.to_string())?;

    let mut creature_files: HashMap<String, CreatureFile> = HashMap::new();
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

        if let Some(creature_id) = is_creature_file(&path) {
            let mut contents = String::new();
            entry
                .read_to_string(&mut contents)
                .map_err(|err| err.to_string())?;

            let parsed: CreatureFile = serde_json::from_str(&contents)
                .map_err(|err| format!("Failed to parse {creature_id}.json: {err}"))?;

            creature_files.insert(
                creature_id.clone(),
                CreatureFile {
                    id: Some(creature_id.clone()),
                    ..parsed
                },
            );

            creature_count += 1;
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

    if creature_files.is_empty() {
        return Err("Archive did not include any creature JSON files.".to_string());
    }

    for (id, creature) in creature_files {
        let filename = format!("{id}.json");
        let path = data_root.join(filename);
        let mut value = serde_json::Value::Object(creature.rest);
        if let serde_json::Value::Object(map) = &mut value {
            map.insert(
                "id".to_string(),
                serde_json::Value::String(creature.id.unwrap_or(id.clone())),
            );
            if !map.contains_key("regionId") {
                if let Some(region_id) = creature.region_id {
                    map.insert("regionId".to_string(), serde_json::Value::String(region_id));
                }
            }
        }

        let serialized = serde_json::to_string_pretty(&value).map_err(|err| err.to_string())?;
        fs::write(path, serialized).map_err(|err| err.to_string())?;
    }

    Ok(ImportSummary {
        creature_count,
        image_count,
    })
}

fn is_creature_file(path: &Path) -> Option<String> {
    if path.extension().map(|ext| ext.eq_ignore_ascii_case("json")) != Some(true) {
        return None;
    }

    let stem = path.file_stem()?.to_string_lossy();
    if stem.is_empty() {
        return None;
    }

    Some(stem.to_string())
}

fn resolve_asset_path(path: &Path, creatures_dir: &Path, spotify_dir: &Path) -> Option<PathBuf> {
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
