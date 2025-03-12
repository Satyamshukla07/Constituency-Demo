import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type UserRole = "admin" | "party_worker" | "public";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().$type<UserRole>(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  createdById: integer("created_by_id").notNull(),
});

export const issues = pgTable("issues", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location"),
  imageUrl: text("image_url"),
  status: text("status").notNull().default("pending"),
  reportedById: integer("reported_by_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const volunteers = pgTable("volunteers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  skills: text("skills"),
  availability: text("availability"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  fullName: true,
  phone: true,
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  date: true,
  location: true,
  imageUrl: true,
});

export const insertIssueSchema = createInsertSchema(issues).pick({
  title: true,
  description: true,
  location: true,
  imageUrl: true,
});

export const insertVolunteerSchema = createInsertSchema(volunteers).pick({
  skills: true,
  availability: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertIssue = z.infer<typeof insertIssueSchema>;
export type InsertVolunteer = z.infer<typeof insertVolunteerSchema>;

export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Issue = typeof issues.$inferSelect;
export type Volunteer = typeof volunteers.$inferSelect;
