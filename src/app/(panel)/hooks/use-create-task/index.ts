import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import { api } from '@/service/api'
import { QueryKeyProps } from '@/types/queryKeyProps'

interface Task {
  name: string
  description: string
}

export interface CreateTask {
  task: Task
}

async function create({ task }: CreateTask) {
  const { data } = await api.post('/task', {
    ...task,
  })

  return data
}

export function useCreateTask({ queryKey }: QueryKeyProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: create,
    mutationKey: ['create-task'],
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Opss, algo deu errado!',
        description: 'Erro ao criar a task.',
      })
    },
  })
}
