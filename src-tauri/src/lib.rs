use serde::Deserialize;
use tauri::WebviewUrl;
use tauri::{WebviewWindowBuilder, Runtime};
mod migrations;
use migrations::get_migrations;

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
            
            // add print button to the body dyanamically
            const printButton = document.createElement('button');
            printButton.id = 'print-btn';
            printButton.textContent = 'Print Receipt';
            printButton.onclick = () => window.print();

            // use raw styles instead of className
            printButton.style.backgroundColor = '#1e293b'; // slate-800
            printButton.style.color = '#ffffff'; // white
            printButton.style.borderRadius = '0.375rem'; // rounded
            printButton.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'; // shadow
            printButton.style.display = 'block';
            printButton.style.margin = '0 auto';
            printButton.style.cursor = 'pointer';
            printButton.style.marginTop = '1.5rem'; // mt-6
            printButton.style.width = 'fit-content'; // to center the button
            printButton.style.padding = '0.5rem 1.5rem'; // px-6 py-2

            // Append the button to the body
            document.body.appendChild(printButton);
        }});"#,
        escaped_html
    );

    webview.eval(&js).map_err(|e| e.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().add_migrations("sqlite:purple.db", get_migrations()).build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, open_print_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
