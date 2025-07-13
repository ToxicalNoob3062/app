// just define a dummy student table for now
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const students = sqliteTable('students', {
  id: integer('id').primaryKey(),
  name: text('name'),
  age: integer('age'),
  division: text('division'),
  contact: text('contact'),
  createdAt: integer('created_at'),
});

export const users = sqliteTable('users', {
  username: text('username').primaryKey(),
  password: text('password'),
  role: text('role'),
  createdAt: integer('created_at'),
})

export const catgeories = sqliteTable('categories', {
  name: text('name').primaryKey(),
  description: text('description'),
});

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey(),
  userId: text('user_id'),
  amount: integer('amount'),
  type: text('type').notNull().references(() => catgeories.name),
  createdAt: integer('created_at'),
  desc: text('desc'),
})

export const relations = sqliteTable(
  'relations',
  {
    studentId: integer('student_id').notNull().references(() => students.id),
    transactionId: integer('transaction_id').notNull().references(() => transactions.id),
    for: text('for').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.studentId, table.transactionId] }),
  ]
);

export const metadata = sqliteTable('metadata', {
  key: text('key').primaryKey(),
  value: text('value'),
})