import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateStrategyDto {
  @ApiProperty({
    description: 'Nombre de la estrategia',
    example: 'Estrategia RSI + MACD',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Descripción detallada de la estrategia',
    example: 'Estrategia basada en la combinación de RSI y MACD para identificar puntos de entrada y salida',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Estado de la estrategia',
    example: 'activo',
    enum: ['activo', 'inactivo', 'en_revision'],
    required: false
  })
  @IsString()
  @IsOptional()
  status?: string;
} 