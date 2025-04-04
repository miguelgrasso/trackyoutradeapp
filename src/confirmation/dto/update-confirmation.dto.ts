import { PartialType } from '@nestjs/swagger';
import { CreateConfirmationDto } from './create-confirmation.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateConfirmationDto extends PartialType(CreateConfirmationDto) {
    @ApiProperty({ description: 'The name of the confirmation', example: 'Break of structure', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: 'The description of the confirmation', example: 'Confirmation based on the break of market structure', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'The status of the confirmation', example: 'active', enum: ['active', 'inactive'], required: false })
    @IsOptional()
    @IsString()
    status?: string;
}

