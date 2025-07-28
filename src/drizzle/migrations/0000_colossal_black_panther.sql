CREATE TABLE `categories` (
	`name` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `metadata` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`dob` integer NOT NULL,
	`division` text NOT NULL,
	`contact` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`amount` real NOT NULL,
	`type` text NOT NULL,
	`created_at` integer NOT NULL,
	`made_for` text NOT NULL,
	`for` text NOT NULL,
	`desc` text NOT NULL,
	FOREIGN KEY (`type`) REFERENCES `categories`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`made_for`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action
);
