CREATE TABLE `categories` (
	`name` text PRIMARY KEY NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `metadata` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`age` integer,
	`division` text,
	`contact` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY NOT NULL,
	`amount` real,
	`type` text NOT NULL,
	`created_at` integer,
	`made_for` text,
	`for` text,
	`desc` text,
	FOREIGN KEY (`type`) REFERENCES `categories`(`name`) ON UPDATE no action ON DELETE no action
);
