import { PrismaService } from '../../infra/database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTaskDTO } from './task_schemas';
export declare class TaskService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTask(data: Prisma.TaskCreateInput): Promise<{
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.Status;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteTask(id: string): Promise<void>;
    updateTask(id: string, data: CreateTaskDTO): Promise<{
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.Status;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllTasks(): Promise<Prisma.TaskUpdateInput[]>;
}
