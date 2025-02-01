import type { TaskStatus } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import { api } from '@/service/api'
import type { QueryKeyProps } from '@/types/queryKeyProps'

interface Task {
  id: string
  status: TaskStatus
}

export interface UpdateTask {
  task: Task
}

async function update({ task }: UpdateTask) {
  const { id, ...rawTask } = task

  const { data } = await api.patch(`/task/${id}`, {
    ...rawTask,
  })

  return data
}

export function useUpdateStatusTask({ queryKey }: QueryKeyProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: update,
    mutationKey: ['update-status-task'],
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Opss, algo deu errado!',
        description: 'Erro ao editar a task.',
      })
    },
  })
}
