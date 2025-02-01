import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTaskDTO } from './task_schemas';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({ data });
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.prisma.task.delete({ where: { id } });
  }

  async updateTask(id: string, data: CreateTaskDTO) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async getAllTasks(): Promise<Prisma.TaskUpdateInput[]> {
    return this.prisma.task.findMany();
  }
}
