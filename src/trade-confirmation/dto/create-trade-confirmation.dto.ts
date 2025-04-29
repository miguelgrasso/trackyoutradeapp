import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateTradeConfirmationDto {
  @ApiProperty({ description: 'ID del detalle del trade asociado', example: 1 })
  @IsNotEmpty()
  @IsInt()
  tradeDetailId: number;

  @ApiProperty({ description: 'ID de la confirmación', example: 1 })
  @IsNotEmpty()
  @IsInt()
  confirmationId: number;

  @ApiProperty({ description: 'ID de la condición', example: 1 })
  @IsNotEmpty()
  @IsInt()
  conditionId: number;

  @ApiProperty({ 
    description: 'Notas específicas para esta confirmación', 
    example: 'Se cumplió perfectamente el patrón de vela engulfing.',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ 
    description: 'URL de la imagen asociada', 
    example: 'https://storage.example.com/trades/12345.jpg',
    required: false
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
} 