'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import type { QueryKey } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import type { ModalActions } from '@/types/modal'

import { useCreateTask } from './hooks/use-create-task'
import { useUpdateTask } from './hooks/use-update-task'
import type { ITask } from './types'

interface Props {
  toUpdateModalTask: ITask | null
  queryKey: QueryKey
  actionsModalTask: ModalActions<ITask>
}

const taskSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome da task deve ter pelo menos 3 caracteres.',
  }),
  description: z.string().min(3, {
    message: 'A descrição da task deve ter pelo menos 3 caracteres.',
  }),
})

type IAddTaskFormData = z.infer<typeof taskSchema>

export function FormContainer(props: Props) {
  const { queryKey, toUpdateModalTask, actionsModalTask } = props

  const { mutateAsync: handleCreateTask, isPending: isPendingCreateTask } =
    useCreateTask({
      queryKey,
    })

  const { mutateAsync: handleUpdateTask, isPending: isPendingUpdateTask } =
    useUpdateTask({
      queryKey,
    })

  const form = useForm<IAddTaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: '',
      name: '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  function onSubmit(taskData: IAddTaskFormData) {
    if (!toUpdateModalTask) {
      handleCreateTask(
        { task: taskData },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Task criado com sucesso!',
              description: 'A task foi adicionado à lista.',
            })

            actionsModalTask.close()
          },
        },
      )
    }

    if (toUpdateModalTask) {
      handleUpdateTask(
        { task: { ...taskData, id: toUpdateModalTask.id } },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Task editado com sucesso!',
              description: 'A task foi atualizada na lista.',
            })

            actionsModalTask.close()
          },
        },
      )
    }
  }

  const isLoading = isPendingCreateTask || isSubmitting || isPendingUpdateTask

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome da tarefa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a descrição da tarefa"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          Salvar
          {isLoading && <LoaderCircle size={18} className="animate-spin" />}
        </Button>
      </form>
    </Form>
  )
}
