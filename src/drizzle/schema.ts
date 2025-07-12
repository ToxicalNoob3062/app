// just define a dummy student table for now
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const students = sqliteTable('students', {
  id: integer('id').primaryKey(),
  name: text('name'),
  age: integer('age'),
});