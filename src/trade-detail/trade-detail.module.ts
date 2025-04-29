import { Module } from '@nestjs/common';
import { TradeDetailService } from './trade-detail.service';
import { TradeDetailController } from './trade-detail.controller';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [TradeDetailController],
  providers: [TradeDetailService, PrismaService],
  exports: [TradeDetailService],
})
export class TradeDetailModule {} 