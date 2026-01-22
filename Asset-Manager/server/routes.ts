import type { Express } from "express";
import type { Server } from "http";
import { setupAuth, hashPassword } from "./auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app, storage);

  // Auth Routes
  app.post(api.auth.register.path, async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await hashPassword(req.body.password);
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword,
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      res.status(400).json({ message: "Registration failed" });
    }
  });

  // Task Routes - Require Authentication
  const requireAuth = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  };

  app.get(api.tasks.list.path, requireAuth, async (req, res) => {
    const query = {
      search: req.query.search as string,
      status: req.query.status as string,
      sort: req.query.sort as string,
    };
    const tasks = await storage.getTasks(req.user!.id, query);
    res.json(tasks);
  });

  app.post(api.tasks.create.path, requireAuth, async (req, res) => {
    try {
      const input = api.tasks.create.input.parse(req.body);
      const task = await storage.createTask(req.user!.id, input);
      res.status(201).json(task);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  app.get(api.tasks.get.path, requireAuth, async (req, res) => {
    const task = await storage.getTask(Number(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.userId !== req.user!.id) return res.status(403).json({ message: "Forbidden" });
    res.json(task);
  });

  app.patch(api.tasks.update.path, requireAuth, async (req, res) => {
    try {
      const input = api.tasks.update.input.parse(req.body);
      const updated = await storage.updateTask(Number(req.params.id), req.user!.id, input);
      if (!updated) return res.status(404).json({ message: "Task not found" });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  app.delete(api.tasks.delete.path, requireAuth, async (req, res) => {
    const success = await storage.deleteTask(Number(req.params.id), req.user!.id);
    if (!success) return res.status(404).json({ message: "Task not found" });
    res.status(204).send();
  });

  // Seed Data (if empty)
  const existingUser = await storage.getUserByUsername("demo");
  if (!existingUser) {
    const hashedPassword = await hashPassword("demo123");
    const user = await storage.createUser({
      username: "demo",
      password: hashedPassword,
    });
    
    await storage.createTask(user.id, {
      title: "Welcome to Task Manager",
      description: "This is your first task. You can edit or delete it.",
      status: "pending"
    });
    await storage.createTask(user.id, {
      title: "In Progress Task",
      description: "This task is currently being worked on.",
      status: "in_progress"
    });
    await storage.createTask(user.id, {
      title: "Completed Task",
      description: "This task has been finished.",
      status: "completed"
    });
  }

  return httpServer;
}
