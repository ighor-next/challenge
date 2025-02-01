import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@/hooks/use-toast'
import { api } from '@/service/api'
import { QueryKeyProps } from '@/types/queryKeyProps'

import type { ITask } from '../../types'

interface Task {
  id: string
  name: string
  description: string
}

export interface UpdateTask {
  task: Task
}

async function update({ task }: UpdateTask) {
  const { id, ...rawTask } = task

  const { data } = await api.put(`/task/${id}`, {
    ...rawTask,
  })

  return data
}

export function useUpdateTask({ queryKey }: QueryKeyProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: update,
    mutationKey: ['update-task'],
    onMutate: async ({ task: { description, name, id } }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousItems = queryClient.getQueryData<ITask[]>(queryKey)

      queryClient.setQueryData(queryKey, (old?: ITask[]) => {
        if (old) {
          return old.map((item) =>
            item.id === id ? { ...item, description, name } : item,
          )
        }
        return old
      })

      return { previousItems }
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousItems)
      toast({
        variant: 'destructive',
        title: 'Opss, algo deu errado!',
        description: 'Erro ao editar a task.',
      })
    },
  })
}
