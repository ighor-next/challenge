import { TaskService } from './tasks.services';
import { CreateTaskDTO } from './task_schemas';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getTasks(body: CreateTaskDTO): Promise<{
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
    getAllTasks(): Promise<import(".prisma/client").Prisma.TaskUpdateInput[]>;
}
