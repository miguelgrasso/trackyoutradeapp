import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConfirmationDto {
    @ApiProperty({ description: 'The name of the confirmation', example: 'Break of structure' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'The description of the confirmation', example: 'Confirmation based on the break of market structure' })
    @IsNotEmpty()
    @IsString()
    description: string;
}

