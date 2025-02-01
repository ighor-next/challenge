import { useQuery } from '@tanstack/react-query'

import { api } from '@/service/api'
import type { TaskStatus } from '@prisma/client'
import type { ITask } from '../../types'

async function get() {
  const { data } = await api.get<Record<TaskStatus, ITask[]>>('/task')

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
