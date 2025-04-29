import { ApiProperty } from '@nestjs/swagger';
import { Trade } from '../../trade/entities/trade.entity';
import { TradeConfirmation } from '../../trade-confirmation/entities/trade-confirmation.entity';

export class TradeDetail {
  @ApiProperty({ description: 'ID único del detalle del trade', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID del trade asociado', example: 1 })
  tradeId: number;

  @ApiProperty({ description: 'Trade asociado' })
  trade?: Trade;

  @ApiProperty({ description: 'Observaciones sobre por qué se tomó el trade', example: 'Se observó un patrón de doble suelo con volumen creciente.' })
  observaciones?: string;

  @ApiProperty({ description: 'Fecha de creación', example: '2023-05-05T14:30:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2023-05-05T14:30:00Z' })
  updatedAt: Date;

  @ApiProperty({ description: 'Confirmaciones asociadas al trade', type: [TradeConfirmation] })
  confirmations?: TradeConfirmation[];
} 