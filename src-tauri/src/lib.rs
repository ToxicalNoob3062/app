use serde::Deserialize;
use tauri::WebviewUrl;
use tauri::{WebviewWindowBuilder, Runtime};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Deserialize)]
pub struct PrintWindowArgs {
    html_content: String,
}


#[tauri::command]
async fn open_print_window<R: Runtime>(
    app_handle: tauri::AppHandle<R>,
    args: PrintWindowArgs,
) -> Result<(), String> {
    let label = format!("print_receipt");
    let url = WebviewUrl::App("print.html".into());

    let webview = WebviewWindowBuilder::new(&app_handle, label, url)
        .title("Print Receipt")
        .inner_size(1000.00, 900.00)
        .resizable(false)
        .build()
        .map_err(|e| e.to_string())?;

    fn escape_js_template_literal(s: &str) -> String {
        s.replace("\\", "\\\\")
            .replace("`", "\\`")
            .replace("$", "\\$")
    }

    let escaped_html = escape_js_template_literal(&args.html_content);
    let js = format!(
        r#"document.addEventListener('DOMContentLoaded', () => {{
            document.body.innerHTML = `{}`;
            document.title = 'Print Receipt';
            setTimeout(() => {{
                window.print();
            }}, 2000);
        }});"#,
        escaped_html
    );

    webview.eval(&js).map_err(|e| e.to_string())?;
    Ok(())
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, open_print_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
