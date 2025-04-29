import { Module } from '@nestjs/common';
import { StrategyConfirmationService } from './strategy-confirmation.service';
import { StrategyConfirmationController } from './strategy-confirmation.controller';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [StrategyConfirmationController],
  providers: [StrategyConfirmationService, PrismaService],
})
export class StrategyConfirmationModule {}
