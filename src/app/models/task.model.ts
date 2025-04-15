import { Person } from './person.model';

export enum Priority {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  DIFFICULT = 'DIFFICULT',
}

export enum Label {
  HTML = 'HTML',
  CSS = 'CSS',
  NODE_JS = 'NODE_JS',
  JQUERY = 'JQUERY',
}

export interface Task {
  id: number;
  title: string;
  person: Person;
  startDate: Date;
  endDate?: Date;
  priority: Priority;
  labels: Label[];
  description: string;
}
