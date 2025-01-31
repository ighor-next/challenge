const TasksEnum = {
  PENDING: "Pendente",
  PROGRESS: "Em andamento",
  COMPLETED: "Feito",
} as const;

export type TaskStatus = {
  [key: string]: string;
};

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: keyof TaskStatus;
}

const Tasks: Task[] = [];

export function getKeys() {
  return TasksEnum;
}

export function getAll() {
  return Tasks;
}

export function getByStatus(status: keyof TaskStatus): Task[] {
  return Tasks.filter((task) => task.status === status);
}

export function add(task: Task) {
  task.id = Date.now();
  Tasks.push(task);
  return task;
}

export function update(task: Task) {
  const index = Tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    Tasks[index] = task;
  }
  return task;
}

export function move(id: number, status: keyof TaskStatus) {
  const task = Tasks.find((t) => t.id === id);
  if (task) {
    task.status = status;
  }
  return task;
}

export function remove(id: number) {
  const index = Tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    Tasks.splice(index, 1);
  }
  return id;
}
