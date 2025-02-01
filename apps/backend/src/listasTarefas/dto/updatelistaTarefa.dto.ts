import { IsOptional, IsString } from 'class-validator';

export class UpdatelistaTarefa {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  updatedAt?: Date;
}
