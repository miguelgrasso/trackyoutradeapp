import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsDate, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTradeDto {

    @ApiProperty({
        description: 'ID del símbolo de trading',
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    symbolId: number; // Foreign key to Symbol

    @ApiProperty({
        description: 'ID del tipo de operación',
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    operationTypeId: number; // Foreign key to OperationType

    @ApiProperty({
        description: 'ID del resultado de la operación',
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    resultId: number; // Foreign key to Result

    @ApiProperty({
        description: 'ID del estado de la operación',
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    statusOperationId: number; // Foreign key to StatusOperation

    @ApiProperty({
        description: 'Cantidad de unidades',
        example: 10
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({
        description: 'Fecha y hora de entrada',
        example: '2024-03-15T10:30:00Z'
    })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    dateEntry: Date;

    @ApiProperty({
        description: 'Precio de entrada',
        example: 100.50
    })
    @IsNumber()
    @IsNotEmpty()
    priceEntry: number;

    @ApiProperty({
        description: 'Precio de salida',
        example: 105.75
    })
    @IsNumber()
    @IsNotEmpty()
    priceExit: number;

    @ApiProperty({
        description: 'Spread de la operación',
        example: 0.5
    })
    @IsNumber()
    @IsNotEmpty()
    spread: number;
    
    @ApiProperty({
        description: 'URL de la imagen previa',
        example: 'https://example.com/image.jpg'
    })
    @IsString()
    @IsOptional()
    imageUrlEntry: string;

    @ApiProperty({
        description: 'URL de la imagen posterior',
        example: 'https://example.com/image.jpg'
    })
    @IsString()
    @IsOptional()
    imageUrlExit: string;

    @ApiProperty({
        description: 'ID de la estrategia',
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    strategyId: number;
}

