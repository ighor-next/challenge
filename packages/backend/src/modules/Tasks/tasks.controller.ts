import {
  Controller,
  Get,
  Post,
  UsePipes,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { TaskService } from './tasks.services';
import { CreateTaskDTO } from './task_schemas';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/add')
  @UsePipes(ZodValidationPipe)
  async getTasks(@Body() body: CreateTaskDTO) {
    return await this.taskService.createTask(body);
  }

  @Delete('/delete/:id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.deleteTask(id);
  }

  @Patch('/update/:id')
  async updateTask(@Param('id') id: string, @Body() data: CreateTaskDTO) {
    return this.taskService.updateTask(id, data);
  }

  @Get('/all')
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }
}
