'use client'
import { zodResolver } from '@hookform/resolvers/zod'
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

const taskSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome do item deve ter pelo menos 3 caracteres.',
  }),
  description: z.string().min(3, {
    message: 'A descrição do item deve ter pelo menos 3 caracteres.',
  }),
})

type IAddTaskFormData = z.infer<typeof taskSchema>

export function FormContainer() {
  const form = useForm<IAddTaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: '',
      name: '',
    },
  })

  const {
    formState: { isSubmitting },
    reset,
  } = form

  function onSubmit(taskData: IAddTaskFormData) {
    console.log(taskData)
  }
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

        {/* <Button type="submit" disabled={isLoading}>
          Salvar
          {isLoading && <LoaderCircle size={18} className="animate-spin" />}
        </Button> */}
      </form>
    </Form>
  )
}
