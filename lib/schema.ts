import {
  pgTable,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
  decimal,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique(),
  name: varchar('name', { length: 255 }),
  gmailAccessToken: text('gmail_access_token'),
  gmailRefreshToken: text('gmail_refresh_token'),
  calendarAccessToken: text('calendar_access_token'),
  calendarRefreshToken: text('calendar_refresh_token'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const emails = pgTable('emails', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  gmailId: varchar('gmail_id', { length: 255 }),
  from: varchar('from', { length: 255 }),
  to: text('to'),
  subject: text('subject'),
  body: text('body'),
  isRead: boolean('is_read').default(false),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const calendarEvents = pgTable('calendar_events', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  googleId: varchar('google_id', { length: 255 }),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  startTime: timestamp('start_time'),
  endTime: timestamp('end_time'),
  attendees: text('attendees'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const inventoryItems = pgTable('inventory_items', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  quantity: integer('quantity').default(0),
  reorderLevel: integer('reorder_level').default(10),
  unitCost: decimal('unit_cost', { precision: 10, scale: 2 }),
  lastUpdated: timestamp('last_updated').defaultNow(),
});

export const equipment = pgTable('equipment', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }),
  location: varchar('location', { length: 255 }),
  purchaseDate: timestamp('purchase_date'),
  status: varchar('status', { length: 50 }).default('active'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const events = pgTable('events', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  date: timestamp('date'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const vendors = pgTable('vendors', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  contact: varchar('contact', { length: 255 }),
  category: varchar('category', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  dueDate: timestamp('due_date'),
  category: varchar('category', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  emails: many(emails),
  calendarEvents: many(calendarEvents),
  inventoryItems: many(inventoryItems),
  equipment: many(equipment),
  events: many(events),
  vendors: many(vendors),
  tasks: many(tasks),
}));

export const emailsRelations = relations(emails, ({ one }) => ({
  user: one(users, {
    fields: [emails.userId],
    references: [users.id],
  }),
}));

export const calendarEventsRelations = relations(
  calendarEvents,
  ({ one }) => ({
    user: one(users, {
      fields: [calendarEvents.userId],
      references: [users.id],
    }),
  })
);

export const inventoryItemsRelations = relations(
  inventoryItems,
  ({ one }) => ({
    user: one(users, {
      fields: [inventoryItems.userId],
      references: [users.id],
    }),
  })
);

export const equipmentRelations = relations(equipment, ({ one }) => ({
  user: one(users, {
    fields: [equipment.userId],
    references: [users.id],
  }),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  user: one(users, {
    fields: [events.userId],
    references: [users.id],
  }),
}));

export const vendorsRelations = relations(vendors, ({ one }) => ({
  user: one(users, {
    fields: [vendors.userId],
    references: [users.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));
