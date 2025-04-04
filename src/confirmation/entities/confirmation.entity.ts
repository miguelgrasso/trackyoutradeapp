import { ApiProperty } from '@nestjs/swagger';

export class Confirmation {
    @ApiProperty({ description: 'The unique identifier of the confirmation', example: 1 })
    id: number;

    @ApiProperty({ description: 'The name of the confirmation', example: 'Break of structure' })
    name: string;

    @ApiProperty({ description: 'The description of the confirmation', example: 'Confirmation based on the break of market structure' })
    description: string;

    @ApiProperty({ description: 'The creation date of the confirmation', example: '2023-04-04T08:50:00Z' })
    createdAt: Date;

    @ApiProperty({ description: 'The status of the confirmation', example: 'active', enum: ['active', 'inactive'] })
    status: string;

    @ApiProperty({ description: 'The last update date of the confirmation', example: '2023-04-04T09:15:00Z' })
    updatedAt: Date;
}
