import { Module } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { StrategyController } from './strategy.controller';
import { PrismaService } from 'src/config/prisma.service';
import { StrategyRepository } from './repositories/strategy.repository';

@Module({
  controllers: [StrategyController],
  providers: [
    StrategyService,
    PrismaService,
    {
      provide: 'IStrategyRepository',
      useClass: StrategyRepository,
    },
  ],
  exports: [StrategyService, 'IStrategyRepository'],
})
export class StrategyModule {} 