CREATE TABLE `bingos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`hash` text NOT NULL,
	`auth` text NOT NULL,
	`name` text NOT NULL,
	`content` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bingos_hash_unique` ON `bingos` (`hash`);