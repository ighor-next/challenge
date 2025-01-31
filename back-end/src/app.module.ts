import { Module } from '@nestjs/common';
import { TasksModule } from './api/tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
