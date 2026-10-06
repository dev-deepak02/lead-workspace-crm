CREATE TABLE `integrations` (
	`tenant` text NOT NULL,
	`provider` text NOT NULL,
	`data` text NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `integration_tenant_provider` ON `integrations` (`tenant`,`provider`);--> statement-breakpoint
CREATE TABLE `oauth_states` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant` text NOT NULL,
	`actor` text NOT NULL,
	`expires` integer NOT NULL
);
