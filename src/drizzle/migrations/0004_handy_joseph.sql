PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_students` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`dob` integer NOT NULL,
	`division` text NOT NULL,
	`contact` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_students`("id", "name", "dob", "division", "contact", "created_at") SELECT "id", "name", "dob", "division", "contact", "created_at" FROM `students`;--> statement-breakpoint
DROP TABLE `students`;--> statement-breakpoint
ALTER TABLE `__new_students` RENAME TO `students`;--> statement-breakpoint
PRAGMA foreign_keys=ON;