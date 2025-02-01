import { useQuery } from '@tanstack/react-query'

import { api } from '@/service/api'
import type { TaskStatus } from '@prisma/client'
import type { ITask } from '../../types'

interface ITasksResponse extends Record<TaskStatus, ITask[]> { }

async function get() {
  const { data } = await api.get<ITasksResponse>('/task')

  return data
}

export function useGetTasks() {
  const queryKey = ['get-tasks']

  const query = useQuery({
    queryKey,
    queryFn: get,
  })

  return { ...query, queryKey }
}
