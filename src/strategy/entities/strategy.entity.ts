import { ApiProperty } from '@nestjs/swagger';
import { Trade } from '../../trade/entities/trade.entity';

export class Strategy {
  @ApiProperty({ description: 'ID único de la estrategia', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre de la estrategia', example: 'RSI + MACD' })
  name: string;

  @ApiProperty({ description: 'Descripción de la estrategia', example: 'Estrategia basada en RSI y MACD para identificar puntos de entrada' })
  description: string;

  @ApiProperty({ description: 'Fecha de creación', example: '2023-05-05T14:30:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Estado de la estrategia', example: 'active', enum: ['active', 'inactive'] })
  status: string;

  @ApiProperty({ description: 'Trades que usan esta estrategia', type: [Trade] })
  trades?: Trade[];
} 