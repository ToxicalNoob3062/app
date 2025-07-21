// just define a dummy student table for now
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const students = sqliteTable("students", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  dob: integer("dob").notNull(),
  division: text("division").notNull(),
  contact: text("contact").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const categories = sqliteTable("categories", {
  name: text("name").primaryKey(),
});

export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey(),
  amount: real("amount").notNull(),
  type: text("type")
    .notNull()
    .references(() => categories.name),
  createdAt: integer("created_at").notNull(),
  madeFor: text("made_for").references(() => students.id).notNull(),
  for: text("for").notNull(),
  desc: text("desc").notNull()  ,
});

export const metadata = sqliteTable("metadata", {
  key: text("key").primaryKey(),
  value: text("value"),
});
