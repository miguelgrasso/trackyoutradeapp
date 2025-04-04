import { PartialType } from '@nestjs/swagger';
import { CreateConditionDto } from './create-condition.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class UpdateConditionDto extends PartialType(CreateConditionDto) {
    @ApiProperty({ description: 'The status of the condition', example: 'active' })
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({ description: 'The confirmation id of the condition', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    confirmationId: number;
    
}
