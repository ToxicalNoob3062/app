import journal from "./src/drizzle/migrations/meta/_journal.json";

const info = journal.entries.map((e, i) => ({
  tag: e.tag,
  version: i + 1,
}));

let filler = "";
for (let i = 0; i < info.length; i++) {
  const mig_template = `    Migration {
            version: ${info[i].version}, // This should correspond to your Drizzle migration version (e.g., from the file name 0000)
            description: "${info[i].tag}", 
            sql: include_str!("../../src/drizzle/migrations/${info[i].tag}.sql"), 
            kind: MigrationKind::Up,
        },`;
  filler += mig_template;
}

const main_content = `use tauri_plugin_sql::{Migration, MigrationKind};
pub fn get_migrations() -> Vec<Migration> {
    vec![
    ${filler}
    ]
}
`;

const write_path = "./src-tauri/src/migrations.rs";
import { writeFile } from "fs/promises";
writeFile(write_path, main_content)
  .then(() => {
    console.log(`Migration file created at ${write_path}`);
  })
  .catch((error) => {
    console.error(`Error writing migration file: ${error}`);
  });
