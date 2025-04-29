import { PartialType } from '@nestjs/swagger';
import { CreateTradeDetailDto } from './create-trade-detail.dto';

export class UpdateTradeDetailDto extends PartialType(CreateTradeDetailDto) {} 