use tauri_plugin_fs::FsExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            // allowed the given directory
            let scope = app.fs_scope();
            let _ = scope.allow_directory("$HOME", false);
            dbg!(scope.is_allowed("$HOME"));

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
