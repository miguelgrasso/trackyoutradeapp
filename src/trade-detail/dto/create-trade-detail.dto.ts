import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTradeDetailDto {
  @ApiProperty({ description: 'ID del trade asociado', example: 1 })
  @IsNotEmpty()
  @IsInt()
  tradeId: number;

  @ApiProperty({ 
    description: 'Observaciones sobre por qué se tomó el trade', 
    example: 'Se observó un patrón de doble suelo con volumen creciente.',
    required: false
  })
  @IsOptional()
  @IsString()
  observaciones?: string;
} 