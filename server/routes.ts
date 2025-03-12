import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertEventSchema, insertIssueSchema, insertVolunteerSchema, insertWardSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Wards
  app.post("/api/wards", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.role !== "admin") return res.sendStatus(403);

    const result = insertWardSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error);

    try {
      const ward = await storage.createWard(result.data);
      res.status(201).json(ward);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get("/api/wards", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const wards = await storage.getWards();
      res.json(wards);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get("/api/wards/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const ward = await storage.getWard(parseInt(req.params.id));
      if (!ward) return res.sendStatus(404);
      res.json(ward);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get("/api/wards/:id/users", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const users = await storage.getUsersByWard(parseInt(req.params.id));
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get("/api/wards/:id/events", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const events = await storage.getEventsByWard(parseInt(req.params.id));
      res.json(events);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get("/api/wards/:id/issues", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const issues = await storage.getIssuesByWard(parseInt(req.params.id));
      res.json(issues);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

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

  // Create initial test wards if none exist
  storage.getWards().then(async (wards) => {
    if (wards.length === 0) {
      const testWards = [
        {
          name: "North Ward",
          number: 1,
          population: 25000,
          description: "Northern region of Magatane",
          keyIssues: "Infrastructure development, Water supply",
        },
        {
          name: "South Ward",
          number: 2,
          population: 30000,
          description: "Southern region of Magatane",
          keyIssues: "Education facilities, Healthcare",
        },
        {
          name: "East Ward",
          number: 3,
          population: 28000,
          description: "Eastern region of Magatane",
          keyIssues: "Road maintenance, Waste management",
        },
      ];

      for (const ward of testWards) {
        await storage.createWard(ward);
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}