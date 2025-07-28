use tauri_plugin_sql::{Migration, MigrationKind};
pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1, // This should correspond to your Drizzle migration version (e.g., from the file name 0000)
            description: "0000_colossal_black_panther", 
            sql: include_str!("../../src/drizzle/migrations/0000_colossal_black_panther.sql"), 
            kind: MigrationKind::Up,
        },
    ]
}
