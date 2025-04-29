import { ApiProperty } from '@nestjs/swagger';

export class StrategyConfirmation {
    @ApiProperty({ description: 'ID de la estrategia', example: 1 })
    strategyId: number;

    @ApiProperty({ description: 'ID de la confirmación', example: 2 })
    confirmationId: number;

    @ApiProperty({ description: 'Estado de la relación', example: 'active', enum: ['active', 'inactive'] })
    status: string;

    @ApiProperty({ description: 'Fecha de creación de la relación', example: '2023-04-05T14:30:00Z' })
    createdAt: Date;
}
