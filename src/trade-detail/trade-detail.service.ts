import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreateTradeDetailDto } from './dto/create-trade-detail.dto';
import { UpdateTradeDetailDto } from './dto/update-trade-detail.dto';

@Injectable()
export class TradeDetailService {
  constructor(private prisma: PrismaService) {}

  async create(createTradeDetailDto: CreateTradeDetailDto) {
    return this.prisma.tradeDetail.create({
      data: createTradeDetailDto,
    });
  }

  async findOne(id: number) {
    const tradeDetail = await this.prisma.tradeDetail.findUnique({
      where: { id },
      include: {
        confirmations: {
          include: {
            confirmation: true,
            condition: true
          }
        }
      }
    });
    
    return tradeDetail || {};
  }

  async findByTradeId(tradeId: number) {
    const tradeDetail = await this.prisma.tradeDetail.findUnique({
      where: { tradeId },
      include: {
        confirmations: {
          include: {
            confirmation: true,
            condition: true,
          },
        },
      },
    });
    console.log("detalle trade", tradeDetail);
    return tradeDetail|| {};;
}


  async update(id: number, updateTradeDetailDto: UpdateTradeDetailDto) {
    return this.prisma.tradeDetail.update({
      where: { id },
      data: updateTradeDetailDto,
    });
  }

  async remove(id: number) {
    return this.prisma.tradeDetail.delete({
      where: { id },
    });
  }
} 