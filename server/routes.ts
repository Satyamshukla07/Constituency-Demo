import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertEventSchema, insertIssueSchema, insertVolunteerSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Events
  app.post("/api/events", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== "admin") return res.sendStatus(403);

    const result = insertEventSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error);

    storage.createEvent({ ...result.data, createdById: req.user.id })
      .then(event => res.status(201).json(event))
      .catch(err => res.status(500).json({ message: err.message }));
  });

  app.get("/api/events", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    storage.getEvents()
      .then(events => res.json(events))
      .catch(err => res.status(500).json({ message: err.message }));
  });

  // Issues
  app.post("/api/issues", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const result = insertIssueSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error);

    storage.createIssue({ ...result.data, reportedById: req.user.id })
      .then(issue => res.status(201).json(issue))
      .catch(err => res.status(500).json({ message: err.message }));
  });

  app.get("/api/issues", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    storage.getIssues()
      .then(issues => res.json(issues))
      .catch(err => res.status(500).json({ message: err.message }));
  });

  app.patch("/api/issues/:id/status", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== "admin") return res.sendStatus(403);

    const statusSchema = z.object({ status: z.string() });
    const result = statusSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error);

    storage.updateIssueStatus(parseInt(req.params.id), result.data.status)
      .then(issue => {
        if (!issue) return res.sendStatus(404);
        res.json(issue);
      })
      .catch(err => res.status(500).json({ message: err.message }));
  });

  // Volunteers
  app.post("/api/volunteers", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const result = insertVolunteerSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error);

    storage.createVolunteer({ ...result.data, userId: req.user.id })
      .then(volunteer => res.status(201).json(volunteer))
      .catch(err => res.status(500).json({ message: err.message }));
  });

  const httpServer = createServer(app);
  return httpServer;
}
