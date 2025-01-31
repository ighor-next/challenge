import { Pencil, Trash2 } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2">
            {task.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={onEdit}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onSelect={onDelete}>
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardFooter className="pb-4">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              task.priority === "high"
                ? "bg-red-500"
                : task.priority === "medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          />
          <span className="text-sm text-muted-foreground">
            {task.priority === "high"
              ? "Alta Prioridade"
              : task.priority === "medium"
              ? "Média Prioridade"
              : "Baixa Prioridade"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}