import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type UserRole = "admin" | "party_worker" | "public";

export const wards = pgTable("wards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  number: integer("number").notNull(),
  population: integer("population"),
  description: text("description"),
  keyIssues: text("key_issues"),
  partyWorkerId: integer("party_worker_id"),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().$type<UserRole>(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  wardId: integer("ward_id"),
  designation: text("designation"),
  address: text("address"),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  createdById: integer("created_by_id").notNull(),
  wardId: integer("ward_id"),
  type: text("type"), // rally, meeting, campaign, etc.
  status: text("status").default("upcoming"),
});

export const issues = pgTable("issues", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location"),
  imageUrl: text("image_url"),
  status: text("status").notNull().default("pending"),
  priority: text("priority").default("medium"),
  reportedById: integer("reported_by_id").notNull(),
  wardId: integer("ward_id").notNull(),
  category: text("category"), // infrastructure, sanitation, etc.
  createdAt: timestamp("created_at").notNull().defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const volunteers = pgTable("volunteers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  wardId: integer("ward_id").notNull(),
  skills: text("skills"),
  availability: text("availability"),
  isActive: boolean("is_active").default(true),
});

// Insert Schemas
export const insertWardSchema = createInsertSchema(wards).pick({
  name: true,
  number: true,
  population: true,
  description: true,
  keyIssues: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  fullName: true,
  phone: true,
  wardId: true,
  designation: true,
  address: true,
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  date: true,
  location: true,
  imageUrl: true,
  wardId: true,
  type: true,
});

export const insertIssueSchema = createInsertSchema(issues).pick({
  title: true,
  description: true,
  location: true,
  imageUrl: true,
  wardId: true,
  priority: true,
  category: true,
});

export const insertVolunteerSchema = createInsertSchema(volunteers).pick({
  wardId: true,
  skills: true,
  availability: true,
});

// Types
export type InsertWard = z.infer<typeof insertWardSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertIssue = z.infer<typeof insertIssueSchema>;
export type InsertVolunteer = z.infer<typeof insertVolunteerSchema>;

export type Ward = typeof wards.$inferSelect;
export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Issue = typeof issues.$inferSelect;
export type Volunteer = typeof volunteers.$inferSelect;