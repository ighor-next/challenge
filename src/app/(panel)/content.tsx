'use client'

import type { TaskStatus } from '@prisma/client'
import { Loader } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import * as Kanban from '@/components/ui/kanban'
import { useModal } from '@/hooks/use-modal'

import { KanbanCard } from './components/kanban/card'
import { KanbanColumn } from './components/kanban/column'
import { FormContainer } from './form'
import { useDeleteTask } from './hooks/use-delete-task'
import { useGetTasks } from './hooks/use-get-tasks'
import { useUpdateStatusTask } from './hooks/use-update-status-task'
import type { ITask } from './types'

export function Content() {
  const {
    isOpen: isOpenModalTask,
    actions: actionsModalTask,
    target: toUpdateModalTask,
  } = useModal<ITask>()

  const {
    isOpen: isOpenAlertDialogTask,
    actions: actionsAlertDialogTask,
    target: toDeleteAlertDialogTask,
  } = useModal<ITask>()

  const { data: getTasks, queryKey, isFetching } = useGetTasks()

  const { mutateAsync: deleteTask } = useDeleteTask({ queryKey })

  const { mutateAsync: updateStatusTask } = useUpdateStatusTask({ queryKey })

  function handleDeleteTask(id: string) {
    deleteTask(
      { taskId: id },
      {
        onSuccess: () => {
          actionsAlertDialogTask.close()
        },
      },
    )
  }

  const handleColumnChange = (newColumns: Record<TaskStatus, ITask[]>) => {
    Object.entries(newColumns).forEach(([status, tasks]) => {
      tasks.forEach((task) => {
        const currentTask = tasks.find((t) => t.id === task.id)
        if (currentTask && currentTask.status !== status) {
          const newStatus = status as TaskStatus

          updateStatusTask({ task: { id: task.id, status: newStatus } })
        }
      })
    })
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => actionsModalTask.open()}>
            Adicionar tarefa
          </Button>
        </div>
        {getTasks && (
          <Kanban.Root
            value={getTasks}
            onValueChange={handleColumnChange}
            getItemValue={(item) => item.id}
          >
            <Kanban.Board className="grid auto-rows-fr grid-cols-3">
              {Object.entries(getTasks).map(([columnValue, tasks]) => (
                <KanbanColumn
                  key={columnValue}
                  value={columnValue}
                  tasks={tasks}
                  actionsAlertDialogTask={actionsAlertDialogTask}
                  actionsModalTask={actionsModalTask}
                />
              ))}
            </Kanban.Board>
            <Kanban.Overlay>
              {({ value, variant }) => {
                if (variant === 'column') {
                  const tasks = getTasks[value as TaskStatus] ?? []

                  return <KanbanColumn value={value} tasks={tasks} />
                }

                const task = Object.values(getTasks)
                  .flat()
                  .find((task) => task.id === value)

                if (!task) return null

                return <KanbanCard task={task} />
              }}
            </Kanban.Overlay>
          </Kanban.Root>
        )}
      </div>

      {!getTasks && isFetching && (
        <div className="mt-[20%] flex items-center justify-center">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      )}

      <Dialog open={isOpenModalTask} onOpenChange={actionsModalTask.close}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar tarefa</DialogTitle>
          </DialogHeader>
          <FormContainer
            actionsModalTask={actionsModalTask}
            toUpdateModalTask={toUpdateModalTask}
            queryKey={queryKey}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isOpenAlertDialogTask}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja realmente deletar esta task?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso irá remover permanentemente
              o item e todos os dados associados a ele.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={actionsAlertDialogTask.close}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                toDeleteAlertDialogTask &&
                handleDeleteTask(toDeleteAlertDialogTask.id)
              }
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
