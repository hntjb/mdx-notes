// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod menu;

use menu::{get_menu, menu_event_handle};

fn main() {
  let menu = get_menu();

  tauri::Builder::default()
    .menu(menu)
    .on_menu_event(menu_event_handle)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}