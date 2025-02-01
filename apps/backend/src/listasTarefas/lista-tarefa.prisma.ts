import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';
import { listaTarefa } from 'core';
import { UpdatelistaTarefa } from './dto/updatelistaTarefa.dto';

@Injectable()
export class ListaTarefaPrisma {
  constructor(readonly prisma: PrismaProvider) {}

  async create(listaTarefa: listaTarefa) {
    return await this.prisma.listaTarefa.create({
      data: {
        titulo: listaTarefa.titulo,
        descricao: listaTarefa.descricao,
      },
    });
  }

  async findAll(): Promise<listaTarefa[]> {
    const tarefas = await this.prisma.listaTarefa.findMany();

    return tarefas.map((tarefa) => ({
      ...tarefa,
      status: tarefa.status as 'Pendente' | 'Em andamento' | 'Feito',
    }));
  }

  async findOne(id: string): Promise<listaTarefa | null> {
    return this.prisma.listaTarefa.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatelistaTarefa: UpdatelistaTarefa) {
    return this.prisma.listaTarefa.update({
      where: { id },
      data: updatelistaTarefa,
    });
  }

  remove(id: string) {
    return this.prisma.listaTarefa.delete({ where: { id } });
  }
}
