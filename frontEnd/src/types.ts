export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface EditTaskModalProps {

  task: Task

  onClose: () => void

  onSave: (updatedTask: Task) => void

  onDelete: (id: string) => void

}

export type TaskType = {
  id: number
  title: string
  description: string
  status: 'Pendente' | 'Em andamento' | 'Feito'
}


export interface TaskListProps {
  status: string;
  tasks: Task[];
  setEditingTask: (task: Task) => void;
}

export interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

export interface AddTaskProps {
  onAdd: (task: Task) => void;
  open: boolean;
  onClose: () => void;
}
