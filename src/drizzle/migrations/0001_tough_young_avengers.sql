CREATE TABLE `categories` (
	`name` text PRIMARY KEY NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `relations` (
	`student_id` integer NOT NULL,
	`transaction_id` integer NOT NULL,
	`for` text NOT NULL,
	PRIMARY KEY(`student_id`, `transaction_id`),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text,
	`amount` integer,
	`type` text NOT NULL,
	`created_at` integer,
	`desc` text,
	FOREIGN KEY (`type`) REFERENCES `categories`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`username` text PRIMARY KEY NOT NULL,
	`password` text,
	`role` text,
	`created_at` integer
);
--> statement-breakpoint
ALTER TABLE `students` ADD `division` text;--> statement-breakpoint
ALTER TABLE `students` ADD `contact` text;--> statement-breakpoint
ALTER TABLE `students` ADD `created_at` integer;