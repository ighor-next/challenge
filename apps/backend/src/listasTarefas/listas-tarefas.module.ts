import { Module } from '@nestjs/common';
import { ListasTarefasController } from './listas-tarefas.controller';
import { ListaTarefaPrisma } from './lista-tarefa.prisma';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ListasTarefasController],
  providers: [ListaTarefaPrisma],
})
export class ListasTarefasModule {}
