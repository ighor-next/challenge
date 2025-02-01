import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { listaTarefa } from 'core';
import { ListaTarefaPrisma } from './lista-tarefa.prisma';
import { UpdatelistaTarefa } from './dto/updatelistaTarefa.dto';

@Controller('listas-tarefas')
export class ListasTarefasController {
  constructor(private readonly repo: ListaTarefaPrisma) {}

  @Post()
  create(@Body() listaTarefa: listaTarefa) {
    return this.repo.create(listaTarefa);
  }

  @Get()
  findAll() {
    return this.repo.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repo.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatelistaTarefa: UpdatelistaTarefa,
  ) {
    return this.repo.update(id, updatelistaTarefa);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repo.remove(id);
  }
}
