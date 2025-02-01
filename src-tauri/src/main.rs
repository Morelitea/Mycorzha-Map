// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;
use std::path::PathBuf;

#[tauri::command]
fn open_file(path: String) -> Result<String, String> {
    fs::read_to_string(PathBuf::from(path)).map_err(|e| e.to_string())
}

fn main() {
    mycorzha_map_lib::run()
}
