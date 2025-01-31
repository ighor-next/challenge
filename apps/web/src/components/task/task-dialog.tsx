import { Dialog, DialogContent, DialogDescription,  DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TaskForm from "./task-form";
import type { Task } from "../../types";

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  task?: Task;
}

export default function TaskDialog({ isOpen, onClose, onSubmit, task }: TaskDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Editar Tarefa" : "Adicionar Tarefa"}</DialogTitle>
          <DialogDescription>
            {task ? "Edite os campos abaixo para atualizar a tarefa." : "Preencha os campos abaixo para adicionar uma nova tarefa."}
          </DialogDescription>
        </DialogHeader>
        <TaskForm onSubmit={onSubmit} task={task} />
      </DialogContent>
    </Dialog>
  );
}