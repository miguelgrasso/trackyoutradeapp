import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStrategyDto {
  @ApiProperty({
    description: 'Nombre de la estrategia',
    example: 'Estrategia RSI + MACD'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descripción detallada de la estrategia',
    example: 'Estrategia basada en la combinación de RSI y MACD para identificar puntos de entrada y salida'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

} 