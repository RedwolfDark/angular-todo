import { Person } from './person.model';

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum LabelColorMap {
  jQuery = '#22c55e',
  Html = '#ef4444',
  CSS = '#3b82f6',
  Nodejs = '#6b7280',
}

export enum Label {
  HTML = 'Html',
  CSS = 'CSS',
  NODE_JS = 'Nodejs',
  JQUERY = 'jQuery',
}

export enum Status {
  COMPLETED = 'COMPLETED',
  TODO = 'TODO',
  BUG = 'BUG',
  IN_PROGRESS = 'IN PROGRESS',
  REVIEW = 'REVIEW',
}

export interface Task {
  id: number;
  title: string;
  person: Person;
  startDate: string;
  endDate?: string;
  priority: Priority;
  labels: Label[];
  description: string;
  status: Status;
}
