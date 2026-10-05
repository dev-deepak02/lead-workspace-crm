CREATE TABLE `audit` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant` text NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`record` text,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `audit_tenant_created` ON `audit` (`tenant`,`created`);--> statement-breakpoint
CREATE TABLE `businesses` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`config` text NOT NULL,
	`created` text NOT NULL,
	`plan` text DEFAULT 'starter' NOT NULL,
	`modules` text DEFAULT '[]' NOT NULL,
	`active` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `businesses_slug_unique` ON `businesses` (`slug`);--> statement-breakpoint
CREATE TABLE `limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `members` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant` text NOT NULL,
	`email` text NOT NULL,
	`role` text NOT NULL,
	FOREIGN KEY (`tenant`) REFERENCES `businesses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `member_tenant_email` ON `members` (`tenant`,`email`);--> statement-breakpoint
CREATE TABLE `records` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant` text NOT NULL,
	`kind` text NOT NULL,
	`data` text NOT NULL,
	`email` text,
	`created` text NOT NULL,
	`updated` text NOT NULL,
	FOREIGN KEY (`tenant`) REFERENCES `businesses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `record_tenant_kind` ON `records` (`tenant`,`kind`);--> statement-breakpoint
CREATE UNIQUE INDEX `lead_tenant_email` ON `records` (`tenant`,`kind`,`email`);--> statement-breakpoint
CREATE TABLE `sends` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant` text NOT NULL,
	`lead` text NOT NULL,
	`campaign` text NOT NULL,
	`subject` text NOT NULL,
	`body` text NOT NULL,
	`status` text NOT NULL,
	`provider` text,
	`token` text NOT NULL,
	`created` text NOT NULL,
	`updated` text NOT NULL,
	`approved_by` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sends_token_unique` ON `sends` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `send_tenant_lead_campaign` ON `sends` (`tenant`,`lead`,`campaign`);--> statement-breakpoint
CREATE INDEX `send_tenant` ON `sends` (`tenant`);
