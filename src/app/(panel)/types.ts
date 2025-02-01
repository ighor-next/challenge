export interface ITask {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high'
  description?: string
  assignee?: string
  dueDate?: string
}
