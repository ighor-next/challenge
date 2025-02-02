import type { TaskStatus } from '@prisma/client'

export interface ITask {
  id: string
  name: string
  status: TaskStatus
  description: string
  createdAt: string
}
