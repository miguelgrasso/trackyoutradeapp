import { Symbol } from '../../symbol/entities/symbol.entity';
import { OperationType } from '../../operation-type/entities/operation-type.entity';
import { Result } from '../../result/entities/result.entity';
import { StatusOperation } from '../../status-operation/entities/status-operation.entity';
import { Strategy } from '../../strategy/entities/strategy.entity';
import { TradeDetail } from '../../trade-detail/entities/trade-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Trade {
    @ApiProperty({ description: 'ID único del trade', example: 1 })
    id: number;

    @ApiProperty({ description: 'ID del símbolo', example: 1 })
    symbolId: number; // Foreign key to Symbol

    @ApiProperty({ description: 'Símbolo asociado' })
    symbol: Symbol; // Relation to Symbol entity

    @ApiProperty({ description: 'ID del tipo de operación', example: 1 })
    operationTypeId: number; // Foreign key to OperationType

    @ApiProperty({ description: 'Tipo de operación asociado' })
    operationType: OperationType; // Relation to OperationType entity

    @ApiProperty({ description: 'ID del resultado', example: 1 })
    resultId: number; // Foreign key to Result

    @ApiProperty({ description: 'Resultado asociado' })
    result: Result; // Relation to Result entity

    @ApiProperty({ description: 'ID del estado de operación', example: 1 })
    statusOperationId: number; // Foreign key to StatusOperation

    @ApiProperty({ description: 'Estado de operación asociado' })
    statusOperation: StatusOperation; // Relation to StatusOperation entity

    @ApiProperty({ description: 'ID de la estrategia (opcional)', example: 1, required: false })
    strategyId?: number; // Foreign key to Strategy (opcional)

    @ApiProperty({ description: 'Estrategia asociada', required: false })
    strategy?: Strategy; // Relation to Strategy entity (opcional)

    @ApiProperty({ description: 'Cantidad', example: 1.5 })
    quantity: number;

    @ApiProperty({ description: 'Fecha de entrada', example: '2023-05-05T14:30:00Z' })
    dateEntry: Date;

    @ApiProperty({ description: 'Precio de entrada', example: 1.2345 })
    priceEntry: number;

    @ApiProperty({ description: 'Precio de salida', example: 1.3456 })
    priceExit: number;

    @ApiProperty({ description: 'Spread', example: 0.0002 })
    spread: number;

    @ApiProperty({ description: 'Detalle del trade', required: false })
    tradeDetail?: TradeDetail; // Relation to TradeDetail entity (opcional)
}