import { Module } from '@nestjs/common';
import { TradeConfirmationService } from './trade-confirmation.service';
import { TradeConfirmationController } from './trade-confirmation.controller';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [TradeConfirmationController],
  providers: [TradeConfirmationService, PrismaService],
  exports: [TradeConfirmationService],
})
export class TradeConfirmationModule {} 