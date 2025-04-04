import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';

@Injectable()
export class TradeService {
  constructor(private prisma: PrismaService) {}

  async create(createTradeDto: CreateTradeDto) {
    return this.prisma.trade.create({
      data: {
        symbolId: createTradeDto.symbolId,
        operationTypeId: createTradeDto.operationTypeId,
        resultId: createTradeDto.resultId,
        statusOperationId: createTradeDto.statusOperationId,
        quantity: createTradeDto.quantity,
        dateEntry: createTradeDto.dateEntry,
        priceEntry: createTradeDto.priceEntry,
        priceExit: createTradeDto.priceExit,
        spread: createTradeDto.spread,
      },
    });
  }

  findAll() {
    return this.prisma.trade.findMany({
      include: {
        symbol: true,
        operationType: true,
        result: true,
        statusOperation: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.trade.findUnique({
      where: { id },
      include: {
        symbol: true,
        operationType: true,
        result: true,
        statusOperation: true,
      },
    });
  }

  update(id: number, updateTradeDto: UpdateTradeDto) {
    return this.prisma.trade.update({
      where: { id },
      data: updateTradeDto,
    });
  }

  remove(id: number) {
    return this.prisma.trade.delete({
      where: { id },
    });
  }
}