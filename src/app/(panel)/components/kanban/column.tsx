import type { TaskStatus } from '@prisma/client'
import { GripVertical } from 'lucide-react'

import type { ITask } from '@/app/(panel)/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import * as Kanban from '@/components/ui/kanban'
import type { ModalActions } from '@/types/modal'

import { KanbanCard } from './card'

interface TaskColumnProps
  extends Omit<React.ComponentProps<typeof Kanban.Column>, 'children'> {
  tasks: ITask[] | undefined
  actionsModalTask?: ModalActions<ITask>
  actionsAlertDialogTask?: ModalActions<ITask>
}

const COLUMN_TITLES: Record<TaskStatus, string> = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em andamento',
  DONE: 'Feito',
}

const BADGE_COLORS: Record<TaskStatus, string> = {
  PENDING: 'bg--500',
  IN_PROGRESS: 'bg-yellow-500 ',
  DONE: 'bg-green-500',
}

export function KanbanColumn({
  value,
  tasks,
  actionsModalTask,
  actionsAlertDialogTask,
  ...props
}: TaskColumnProps) {
  return (
    <Kanban.Column value={value} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {COLUMN_TITLES[value as TaskStatus]}
          </span>

          <Badge
            variant="secondary"
            className={`pointer-events-none rounded-sm text-muted ${BADGE_COLORS[value as TaskStatus]}`}
          >
            {tasks?.length}
          </Badge>
        </div>
        <Kanban.ColumnHandle asChild>
          <Button variant="ghost" size="icon">
            <GripVertical className="h-4 w-4" />
          </Button>
        </Kanban.ColumnHandle>
      </div>
      <div className="flex flex-col gap-2 p-0.5">
        {tasks?.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            actionsModalTask={actionsModalTask}
            actionsAlertDialogTask={actionsAlertDialogTask}
            asHandle
          />
        ))}
      </div>
    </Kanban.Column>
  )
}
