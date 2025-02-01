import type { TaskStatus } from '@prisma/client'
import { useMutation} from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import { api } from '@/service/api'


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

export function useUpdateStatusTask() {

  return useMutation({
    mutationFn: update,
    mutationKey: ['update-status-task'],
    onError: (_error, _variables, context) => {
      toast({
        variant: 'destructive',
        title: 'Opss, algo deu errado!',
        description: 'Erro ao editar a task.',
      })
    },
  })
}
