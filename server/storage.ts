import { User, Event, Issue, Volunteer, Ward, InsertUser, InsertEvent, InsertIssue, InsertVolunteer, InsertWard } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // Ward operations
  createWard(ward: InsertWard): Promise<Ward>;
  getWard(id: number): Promise<Ward | undefined>;
  getWards(): Promise<Ward[]>;

  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsersByWard(wardId: number): Promise<User[]>;

  // Event operations
  createEvent(event: InsertEvent & { createdById: number }): Promise<Event>;
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getEventsByWard(wardId: number): Promise<Event[]>;

  // Issue operations
  createIssue(issue: InsertIssue & { reportedById: number }): Promise<Issue>;
  getIssues(): Promise<Issue[]>;
  getIssuesByWard(wardId: number): Promise<Issue[]>;
  updateIssueStatus(id: number, status: string): Promise<Issue | undefined>;

  // Volunteer operations
  createVolunteer(volunteer: InsertVolunteer & { userId: number }): Promise<Volunteer>;
  getVolunteersByWard(wardId: number): Promise<Volunteer[]>;

  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private wards: Map<number, Ward>;
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private issues: Map<number, Issue>;
  private volunteers: Map<number, Volunteer>;
  sessionStore: session.Store;
  private currentId: { [key: string]: number };

  constructor() {
    this.wards = new Map();
    this.users = new Map();
    this.events = new Map();
    this.issues = new Map();
    this.volunteers = new Map();
    this.currentId = { wards: 1, users: 1, events: 1, issues: 1, volunteers: 1 };
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  // Ward operations
  async createWard(insertWard: InsertWard): Promise<Ward> {
    const id = this.currentId.wards++;
    const ward: Ward = { ...insertWard, id, partyWorkerId: null };
    this.wards.set(id, ward);
    return ward;
  }

  async getWard(id: number): Promise<Ward | undefined> {
    return this.wards.get(id);
  }

  async getWards(): Promise<Ward[]> {
    return Array.from(this.wards.values());
  }

  // User operations
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

  async getUsersByWard(wardId: number): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (user) => user.wardId === wardId
    );
  }

  // Event operations
  async createEvent(event: InsertEvent & { createdById: number }): Promise<Event> {
    const id = this.currentId.events++;
    const newEvent: Event = { ...event, id, status: "upcoming" };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getEventsByWard(wardId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.wardId === wardId
    );
  }

  // Issue operations
  async createIssue(issue: InsertIssue & { reportedById: number }): Promise<Issue> {
    const id = this.currentId.issues++;
    const newIssue: Issue = { 
      ...issue, 
      id, 
      status: "pending",
      createdAt: new Date(),
      resolvedAt: null
    };
    this.issues.set(id, newIssue);
    return newIssue;
  }

  async getIssues(): Promise<Issue[]> {
    return Array.from(this.issues.values());
  }

  async getIssuesByWard(wardId: number): Promise<Issue[]> {
    return Array.from(this.issues.values()).filter(
      (issue) => issue.wardId === wardId
    );
  }

  async updateIssueStatus(id: number, status: string): Promise<Issue | undefined> {
    const issue = this.issues.get(id);
    if (!issue) return undefined;

    const updatedIssue = { 
      ...issue, 
      status,
      resolvedAt: status === "resolved" ? new Date() : null
    };
    this.issues.set(id, updatedIssue);
    return updatedIssue;
  }

  // Volunteer operations
  async createVolunteer(volunteer: InsertVolunteer & { userId: number }): Promise<Volunteer> {
    const id = this.currentId.volunteers++;
    const newVolunteer: Volunteer = { ...volunteer, id };
    this.volunteers.set(id, newVolunteer);
    return newVolunteer;
  }

  async getVolunteersByWard(wardId: number): Promise<Volunteer[]> {
    return Array.from(this.volunteers.values()).filter(
      (volunteer) => volunteer.wardId === wardId
    );
  }
}

export const storage = new MemStorage();