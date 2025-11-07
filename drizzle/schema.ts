import { pgTable, uuid, text, timestamp, pgEnum, jsonb, index, integer } from 'drizzle-orm/pg-core';

/* ------------------- ENUMS ------------------- */
export const subscriptionPlanEnum = pgEnum('subscription_plan', ['free', 'pro', 'enterprise']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'cancelled', 'past_due']);
export const formStatusEnum = pgEnum('form_status', ['active', 'completed']);
export const submissionsStatusEnum = pgEnum('submissions_status', ['pending', 'completed', 'failed']);

/* ------------------- USERS ------------------- */
export const users = pgTable('users', {
    id: uuid('id').primaryKey(), // Needs to be filled by auth.users.id
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    profilePhoto: text('profile_photo'),
    createdAt: timestamp('created_at').defaultNow(),
});

/* ------------------- SUBSCRIPTIONS ------------------- */
export const subscriptions = pgTable(
    'subscriptions',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        plan: subscriptionPlanEnum('plan').default('free').notNull(),
        status: subscriptionStatusEnum('status').default('active').notNull(),
        subscriptionStart: timestamp('subscription_start').defaultNow(),
        subscriptionEnd: timestamp('subscription_end'),
        invoiceLink: text('invoice_link'),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (table) => [index('subscriptions_user_idx').on(table.userId)]
);

/* ------------------- FORMS ------------------- */
export const forms = pgTable(
    'forms',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        name: text('name').notNull(),
        submissions: integer('submissions').default(0).notNull(),
        status: formStatusEnum('status').default('active').notNull(),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (table) => [index('forms_user_idx').on(table.userId)]
);

/* ------------------- SUBMISSIONS ------------------- */
export const submissions = pgTable(
    'submissions',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        formId: uuid('form_id')
            .notNull()
            .references(() => forms.id, { onDelete: 'cascade' }),
        data: jsonb('data').notNull(), // JSON for flexible schema (attachments, answers, etc.)

        // File URLs
        videoUrl: text('video_url'), // uploaded by user
        transcriptUrl: text('transcript_url'), // auto-generated after processing
        jsonResultUrl: text('json_result_url'), // generated structured data
        markdownUrl: text('markdown_url'), // generated markdown summary

        // Processing state machine
        status: submissionsStatusEnum('status').default('pending'),
        errorMessage: text('error_message'),

        processedAt: timestamp('processed_at'),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (table) => [index('submissions_form_idx').on(table.formId)]
);
