import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const TasksEnum = {
  PENDING: 'Pendente',
  PROGRESS: 'Em andamento',
  COMPLETED: 'Feito',
} as const;

export type TaskStatus = {
  [key: string]: string;
};

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: keyof TaskStatus;
}

const Tasks: Task[] = [];

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: Date.now(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TasksEnum.PENDING,
    };

    Tasks.push(newTask);
    return newTask;
  }

  findAll() {
    return Tasks;
  }

  findOne(id: number) {
    return Tasks.find((task) => task.id === id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);
    if (!task) throw new Error('Task not found');
    task.title = updateTaskDto.title || task.title;
    task.description = updateTaskDto.description || task.description;
    task.status = updateTaskDto.status || task.status;

    return task;
  }

  remove(id: number) {
    const task = this.findOne(id);
    if (!task) throw new Error('Task not found');
    Tasks.splice(Tasks.indexOf(task), 1);

    return { ok: true };
  }
}
