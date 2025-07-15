PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_students` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`age` integer,
	`division` text,
	`contact` text,
	`created_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_students`("id", "name", "age", "division", "contact", "created_at") SELECT "id", "name", "age", "division", "contact", "created_at" FROM `students`;--> statement-breakpoint
DROP TABLE `students`;--> statement-breakpoint
ALTER TABLE `__new_students` RENAME TO `students`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`amount` real,
	`type` text NOT NULL,
	`created_at` integer,
	`made_for` text,
	`for` text,
	`desc` text,
	FOREIGN KEY (`type`) REFERENCES `categories`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`made_for`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("id", "amount", "type", "created_at", "made_for", "for", "desc") SELECT "id", "amount", "type", "created_at", "made_for", "for", "desc" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;