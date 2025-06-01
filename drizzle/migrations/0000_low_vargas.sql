CREATE TABLE `bingos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`hash` text NOT NULL,
	`auth` text NOT NULL,
	`name` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`compatibility` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bingos_hash_unique` ON `bingos` (`hash`);