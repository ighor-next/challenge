const API_URL = "https://api.digitails.com.br";

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

export function getKeys() {
  return TasksEnum;
}

export async function getAll() {
  const req = await fetch(`${API_URL}/tasks`, { method: "GET" });

  if (!req.ok) return [req.status, null];
  const data = await req.json();

  return [null, data];
}

export async function add(task: Task) {
  const req = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!req.ok) return [req.status, null];
  const data = await req.json();

  return [null, data];
}

export async function update(task: Task) {
  const req = await fetch(`${API_URL}/tasks/${task.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!req.ok) return [req.status, null];
  const data = await req.json();

  return [null, data];
}

export async function remove(id: number) {
  const req = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  if (!req.ok) return [req.status, null];
  return [null, true];
}
