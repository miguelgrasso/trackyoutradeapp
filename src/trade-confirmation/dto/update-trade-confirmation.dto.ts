import { PartialType } from '@nestjs/swagger';
import { CreateTradeConfirmationDto } from './create-trade-confirmation.dto';

export class UpdateTradeConfirmationDto extends PartialType(CreateTradeConfirmationDto) {} 