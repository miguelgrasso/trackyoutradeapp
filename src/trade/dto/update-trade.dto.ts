import { PartialType } from '@nestjs/mapped-types';
import { CreateTradeDto } from './create-trade.dto';
import { IsInt, IsNumber, IsDate, IsOptional, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTradeDto extends PartialType(CreateTradeDto) {
    @IsInt()
    @IsOptional()
    symbolId?: number; // Foreign key to Symbol

    @IsInt()
    @IsOptional()
    operationTypeId?: number; // Foreign key to OperationType

    @IsInt()
    @IsOptional()
    resultId?: number; // Foreign key to Result

    @IsInt()
    @IsOptional()
    statusOperationId?: number; // Foreign key to StatusOperation

    @IsNumber()
    @IsOptional()
    quantity?: number;

    @IsDate()
    @IsOptional()
    dateEntry?: Date;

    @IsNumber()
    @IsOptional()
    priceEntry?: number;

    @IsNumber()
    @IsOptional()
    priceExit?: number;

    @IsNumber()
    @IsOptional()
    spread?: number;

    @ApiProperty({
        description: 'URL de la imagen previa',
        example: 'https://example.com/image.jpg'
    })
    @IsString()
    @IsOptional()
    imageUrlpre: string;

    @ApiProperty({
        description: 'URL de la imagen posterior',
        example: 'https://example.com/image.jpg'
    })
    @IsString()
    @IsOptional()
    imageUrlpost: string;

    @ApiProperty({
        description: 'ID de la estrategia',
        example: 1
    })
    @IsInt()
    @IsOptional()
    strategyId?: number;        
}