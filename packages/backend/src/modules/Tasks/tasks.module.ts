import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.services';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [PrismaService, TaskService],
})
export class TasksModule {}
