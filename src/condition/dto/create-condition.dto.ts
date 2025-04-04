import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConditionDto {
    @ApiProperty({ description: 'The name of the condition', example: 'Break of structure' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'The description of the condition', example: 'Confirmation based on the break of market structure' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: 'The confirmation id of the condition', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    confirmationId: number;
    
}
