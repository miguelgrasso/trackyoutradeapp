import { ApiProperty } from '@nestjs/swagger';
import { TradeDetail } from '../../trade-detail/entities/trade-detail.entity';
import { Confirmation } from '../../confirmation/entities/confirmation.entity';
import { Condition } from '../../condition/entities/condition.entity';

export class TradeConfirmation {
  @ApiProperty({ description: 'ID único de la confirmación del trade', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID del detalle del trade asociado', example: 1 })
  tradeDetailId: number;

  @ApiProperty({ description: 'Detalle del trade asociado' })
  tradeDetail?: TradeDetail;

  @ApiProperty({ description: 'ID de la confirmación', example: 1 })
  confirmationId: number;

  @ApiProperty({ description: 'Confirmación asociada' })
  confirmation?: Confirmation;

  @ApiProperty({ description: 'ID de la condición', example: 1 })
  conditionId: number;

  @ApiProperty({ description: 'Condición asociada' })
  condition?: Condition;

  @ApiProperty({ description: 'Notas específicas para esta confirmación', example: 'Se cumplió perfectamente el patrón de vela engulfing.' })
  notes?: string;

  @ApiProperty({ description: 'URL de la imagen asociada', example: 'https://storage.example.com/trades/12345.jpg' })
  imageUrl?: string;

  @ApiProperty({ description: 'Fecha de creación', example: '2023-05-05T14:30:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización', example: '2023-05-05T14:30:00Z' })
  updatedAt: Date;
} 