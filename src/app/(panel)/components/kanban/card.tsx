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

interface TaskCardProps
  extends Omit<React.ComponentProps<typeof Kanban.Item>, 'value'> {
  task: ITask
  deleteTasK?: (taskId: string) => void
}

export function KanbanCard({ task, deleteTasK, ...props }: TaskCardProps) {
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
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteTasK && deleteTasK(task.id)}
                  onMouseDown={(e) => e.stopPropagation()}
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
