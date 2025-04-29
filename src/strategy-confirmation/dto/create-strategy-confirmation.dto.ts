import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateStrategyConfirmationDto {
    @ApiProperty({ description: 'ID de la estrategia', example: 1 })
    @IsNotEmpty()
    @IsInt()
    strategyId: number;

    @ApiProperty({ description: 'ID de la confirmación', example: 2 })
    @IsNotEmpty()
    @IsInt()
    confirmationId: number;

    @ApiProperty({ 
        description: 'Estado de la relación', 
        example: 'active', 
        enum: ['active', 'inactive'], 
        default: 'active'
    })
    @IsOptional()
    @IsString()
    status?: string = 'active';
}
