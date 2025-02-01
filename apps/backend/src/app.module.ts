import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ListasTarefasModule } from './listasTarefas/listas-tarefas.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ListasTarefasModule, DbModule],
  controllers: [AppController],
})
export class AppModule {}
