// Em 'types.ts' ou onde você define o tipo 'Task'

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
  
  }