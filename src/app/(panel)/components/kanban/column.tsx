import type { TaskStatus } from '@prisma/client'
import { GripVertical } from 'lucide-react'

import type { ITask } from '@/app/(panel)/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import * as Kanban from '@/components/ui/kanban'

import { KanbanCard } from './card'

interface TaskColumnProps
  extends Omit<React.ComponentProps<typeof Kanban.Column>, 'children'> {
  tasks: ITask[]
}

const COLUMN_TITLES: Record<TaskStatus, string> = {
  PENDING: 'Backlog',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

export function KanbanColumn({ value, tasks, ...props }: TaskColumnProps) {
  return (
    <Kanban.Column value={value} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {COLUMN_TITLES[value as TaskStatus]}
          </span>

          <Badge variant="secondary" className="pointer-events-none rounded-sm">
            {tasks.length}
          </Badge>
        </div>
        <Kanban.ColumnHandle asChild>
          <Button variant="ghost" size="icon">
            <GripVertical className="h-4 w-4" />
          </Button>
        </Kanban.ColumnHandle>
      </div>
      <div className="flex flex-col gap-2 p-0.5">
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} asHandle />
        ))}
      </div>
    </Kanban.Column>
  )
}
