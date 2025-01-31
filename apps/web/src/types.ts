export type Task = {
  id: string
  title: string
  description: string
  status: "pending" | "in_progress" | "done"
  priority: "low" | "medium" | "high"
}

export type Column = {
  id: string
  title: string
  tasks: Task[]
}
