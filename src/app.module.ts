import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeModule } from './trade/trade.module';
import { SymbolModule } from './symbol/symbol.module';
import { ResultModule } from './result/result.module';
import { OperationTypeModule } from './operation-type/operation-type.module';
import { StatusOperationModule } from './status-operation/status-operation.module';
import { StrategyModule } from './strategy/strategy.module';
import { ConfirmationModule } from './confirmation/confirmation.module';
import { ConditionModule } from './condition/condition.module';
import { StrategyConfirmationModule } from './strategy-confirmation/strategy-confirmation.module';
import { TradeDetailModule } from './trade-detail/trade-detail.module';
import { TradeConfirmationModule } from './trade-confirmation/trade-confirmation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/tradingapp'),
    TradeModule,
    SymbolModule,
    ResultModule,
    OperationTypeModule,
    StatusOperationModule,
    StrategyModule,
    ConfirmationModule,
    ConditionModule,
    StrategyConfirmationModule,
    TradeDetailModule,
    TradeConfirmationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
