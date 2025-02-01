'use client'

import type { TaskStatus } from '@prisma/client'
import { useEffect, useState } from 'react'

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
import { useGetTasks } from './hooks/use-get-tasks'
import type { ITask } from './types'

export function Content() {
  const {
    isOpen: isOpenModalTask,
    actions: actionsModalTask,
    target: toUpdateModalTask,
  } = useModal<ITask>()

  const { data: tasks, queryKey } = useGetTasks()

  const [columns, setColumns] = useState<Record<TaskStatus, ITask[]>>({
    PENDING: [],
    IN_PROGRESS: [],
    DONE: [],
  })

  useEffect(() => {
    if (tasks) {
      const newColumns: Record<TaskStatus, ITask[]> = {
        PENDING: [],
        IN_PROGRESS: [],
        DONE: [],
      }

      tasks.forEach((task) => {
        if (newColumns[task.status]) {
          newColumns[task.status].push(task)
        }
      })

      setColumns(newColumns)
    }
  }, [tasks])

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => actionsModalTask.open()}>
            Adicionar tarefa
          </Button>
        </div>
        <Kanban.Root
          value={columns}
          onValueChange={setColumns}
          getItemValue={(item) => item.id}
        >
          <Kanban.Board className="grid auto-rows-fr grid-cols-3">
            {Object.entries(columns).map(([columnValue, tasks]) => (
              <KanbanColumn
                key={columnValue}
                value={columnValue}
                tasks={tasks}
              />
            ))}
          </Kanban.Board>
          <Kanban.Overlay>
            {({ value, variant }) => {
              if (variant === 'column') {
                const tasks = columns[value as TaskStatus] ?? []

                return <KanbanColumn value={value} tasks={tasks} />
              }

              const task = Object.values(columns)
                .flat()
                .find((task) => task.id === value)

              if (!task) return null

              return <KanbanCard task={task} />
            }}
          </Kanban.Overlay>
        </Kanban.Root>
      </div>

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
    </>
  )
}
