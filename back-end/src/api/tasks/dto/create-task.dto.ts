import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título do tarefa', example: 'Beber água' })
  title: string;
  @ApiProperty({ description: 'Descrição da tarefa', example: 'Fazer café' })
  description: string;
  @ApiProperty({ description: 'Status da tarefa', example: 'PENDING' })
  status: string;
}
