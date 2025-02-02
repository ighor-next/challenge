import { Ellipsis } from 'lucide-react'

import type { ITask } from '@/app/(panel)/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import * as Kanban from '@/components/ui/kanban'
import type { ModalActions } from '@/types/modal'

interface TaskCardProps
  extends Omit<React.ComponentProps<typeof Kanban.Item>, 'value'> {
  task: ITask
  actionsModalTask?: ModalActions<ITask>
  actionsAlertDialogTask?: ModalActions<ITask>
}

export function KanbanCard({
  task,
  actionsModalTask,
  actionsAlertDialogTask,
  ...props
}: TaskCardProps) {
  return (
    <Kanban.Item key={task.id} value={task.id} asChild {...props}>
      <div className="rounded-md border bg-card p-3 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="line-clamp-1 text-sm font-medium">
              {task.name}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    actionsModalTask && actionsModalTask.open(task)
                  }
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() =>
                    actionsAlertDialogTask && actionsAlertDialogTask.open(task)
                  }
                >
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            {task.description}
          </div>
        </div>
      </div>
    </Kanban.Item>
  )
}
