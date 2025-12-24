ALTER TABLE "submissions" RENAME COLUMN "files_size_id" TO "files_submission_id";--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "summary" text;