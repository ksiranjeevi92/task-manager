export enum TaskStatus {
  OPEN = 'Open',
  COMPLETED = 'Completed',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}
