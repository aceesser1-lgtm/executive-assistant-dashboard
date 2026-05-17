export type UserRole = 'owner' | 'partner';
export type RsvpStatus = 'pending' | 'accepted' | 'declined' | 'tentative';
export type TaskCategory = 'daily' | 'weekly' | 'monthly';
export type Recurrence = 'daily' | 'weekly' | 'monthly';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Email {
  id: string;
  userId: string;
  from: string;
  to: string[];
  cc?: string[];
  subject: string;
  body: string;
  timestamp: Date;
  read: boolean;
  starred: boolean;
}

export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  assignee?: string;
}

export interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
  dueDate: Date;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  rsvpStatus: RsvpStatus;
  dietaryRestrictions?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: string;
  guests: Guest[];
  checklists: Checklist[];
  notes: string;
}

export interface ServiceDate {
  id: string;
  date: Date;
  service: string;
  notes?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  serviceDates: ServiceDate[];
  notes: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  completed: boolean;
  dueDate: Date;
  recurrence?: Recurrence;
  assignee?: string;
}
