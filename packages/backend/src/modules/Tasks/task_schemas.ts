import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']),
});

export class CreateTaskDTO extends createZodDto(CreateTaskSchema) {}
