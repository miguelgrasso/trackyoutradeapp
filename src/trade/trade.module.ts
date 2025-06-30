import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { PrismaService } from 'src/config/prisma.service';
import { TradeRepository } from './repositories/trade.repository';
import { ForeignKeyValidator } from './validators/foreign-key.validator';
import { BusinessRulesValidator } from './validators/business-rules.validator';
import { ValidationService } from '../common/services/validation.service';
import { IValidator } from '../common/interfaces/validator.interface';
import { CreateTradeDto } from './dto/create-trade.dto';

@Module({
  controllers: [TradeController],
  providers: [
    TradeService,
    PrismaService,
    ValidationService,
    TradeRepository,
    {
      provide: 'ITradeRepository',
      useClass: TradeRepository,
    },
    {
      provide: 'TRADE_VALIDATORS',
      useFactory: (
        foreignKeyValidator: ForeignKeyValidator,
        businessRulesValidator: BusinessRulesValidator,
      ): IValidator<CreateTradeDto>[] => [
        foreignKeyValidator,
        businessRulesValidator,
      ],
      inject: [ForeignKeyValidator, BusinessRulesValidator],
    },
    ForeignKeyValidator,
    BusinessRulesValidator,
  ],
  exports: [TradeService, 'ITradeRepository'],
})
export class TradeModule {}
