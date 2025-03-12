import { User, Event, Issue, Volunteer, InsertUser, InsertEvent, InsertIssue, InsertVolunteer } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Event operations
  createEvent(event: InsertEvent & { createdById: number }): Promise<Event>;
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  
  // Issue operations
  createIssue(issue: InsertIssue & { reportedById: number }): Promise<Issue>;
  getIssues(): Promise<Issue[]>;
  updateIssueStatus(id: number, status: string): Promise<Issue | undefined>;
  
  // Volunteer operations
  createVolunteer(volunteer: InsertVolunteer & { userId: number }): Promise<Volunteer>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private issues: Map<number, Issue>;
  private volunteers: Map<number, Volunteer>;
  sessionStore: session.Store;
  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.issues = new Map();
    this.volunteers = new Map();
    this.currentId = { users: 1, events: 1, issues: 1, volunteers: 1 };
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEvent(event: InsertEvent & { createdById: number }): Promise<Event> {
    const id = this.currentId.events++;
    const newEvent: Event = { ...event, id };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createIssue(issue: InsertIssue & { reportedById: number }): Promise<Issue> {
    const id = this.currentId.issues++;
    const newIssue: Issue = { 
      ...issue, 
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.issues.set(id, newIssue);
    return newIssue;
  }

  async getIssues(): Promise<Issue[]> {
    return Array.from(this.issues.values());
  }

  async updateIssueStatus(id: number, status: string): Promise<Issue | undefined> {
    const issue = this.issues.get(id);
    if (!issue) return undefined;
    
    const updatedIssue = { ...issue, status };
    this.issues.set(id, updatedIssue);
    return updatedIssue;
  }

  async createVolunteer(volunteer: InsertVolunteer & { userId: number }): Promise<Volunteer> {
    const id = this.currentId.volunteers++;
    const newVolunteer: Volunteer = { ...volunteer, id };
    this.volunteers.set(id, newVolunteer);
    return newVolunteer;
  }
}

export const storage = new MemStorage();
