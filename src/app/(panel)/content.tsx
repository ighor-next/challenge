'use client'

import * as React from 'react'

import * as Kanban from '@/components/ui/kanban'

import { KanbanCard } from './components/kanban/card'
import { KanbanColumn } from './components/kanban/column'
import type { Task } from './types'

export function Content() {
  const [columns, setColumns] = React.useState<Record<string, Task[]>>({
    backlog: [
      {
        id: '1',
        title: 'Add authentication',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2024-04-01',
      },
      {
        id: '2',
        title: 'Create API endpoints',
        priority: 'medium',
        assignee: 'Jane Smith',
        dueDate: '2024-04-05',
      },
      {
        id: '3',
        title: 'Write documentation',
        priority: 'low',
        assignee: 'Bob Johnson',
        dueDate: '2024-04-10',
      },
    ],
    inProgress: [
      {
        id: '4',
        title: 'Design system updates',
        priority: 'high',
        assignee: 'Alice Brown',
        dueDate: '2024-03-28',
      },
      {
        id: '5',
        title: 'Implement dark mode',
        priority: 'medium',
        assignee: 'Charlie Wilson',
        dueDate: '2024-04-02',
      },
    ],
    done: [
      {
        id: '7',
        title: 'Setup project',
        priority: 'high',
        assignee: 'Eve Davis',
        dueDate: '2024-03-25',
      },
      {
        id: '8',
        title: 'Initial commit',
        priority: 'low',
        assignee: 'Frank White',
        dueDate: '2024-03-24',
      },
    ],
  })

  return (
    <div className="space-y-4">
      <div>BUTTON ADICIONAR TASL</div>
      <Kanban.Root
        value={columns}
        onValueChange={setColumns}
        getItemValue={(item) => item.id}
      >
        <Kanban.Board className="grid auto-rows-fr grid-cols-3">
          {Object.entries(columns).map(([columnValue, tasks]) => (
            <KanbanColumn key={columnValue} value={columnValue} tasks={tasks} />
          ))}
        </Kanban.Board>
        <Kanban.Overlay>
          {({ value, variant }) => {
            if (variant === 'column') {
              const tasks = columns[value] ?? []

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
  )
}
