import { PartialType } from '@nestjs/swagger';
import { CreateStrategyConfirmationDto } from './create-strategy-confirmation.dto';

export class UpdateStrategyConfirmationDto extends PartialType(CreateStrategyConfirmationDto) {}
