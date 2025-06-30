import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { ITradeRepository } from '../interfaces/trade-repository.interface';
import { Trade } from '../entities/trade.entity';
import { CreateTradeDto } from '../dto/create-trade.dto';
import { UpdateTradeDto } from '../dto/update-trade.dto';

@Injectable()
export class TradeRepository implements ITradeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTradeDto): Promise<Trade> {
    return this.prisma.trade.create({
      data: {
        symbolId: data.symbolId,
        operationTypeId: data.operationTypeId,
        resultId: data.resultId,
        statusOperationId: data.statusOperationId,
        quantity: data.quantity,
        dateEntry: data.dateEntry,
        priceEntry: data.priceEntry,
        priceExit: data.priceExit,
        spread: data.spread,
        strategyId: data.strategyId,
      },
      include: this.getFullInclude(),
    }) as any;
  }

  async findAll(): Promise<Trade[]> {
    return this.prisma.trade.findMany({
      orderBy: { dateEntry: 'desc' },
    }) as any;
  }

  async findAllWithRelations(): Promise<Trade[]> {
    return this.prisma.trade.findMany({
      include: this.getFullInclude(),
      orderBy: { dateEntry: 'desc' },
    }) as any;
  }

  async findById(id: number): Promise<Trade | null> {
    return this.prisma.trade.findUnique({
      where: { id },
    }) as any;
  }

  async findByIdWithRelations(id: number): Promise<Trade | null> {
    return this.prisma.trade.findUnique({
      where: { id },
      include: this.getFullInclude(),
    }) as any;
  }

  async findByStrategyId(strategyId: number): Promise<Trade[]> {
    return this.prisma.trade.findMany({
      where: { strategyId },
      include: this.getFullInclude(),
      orderBy: { dateEntry: 'desc' },
    }) as any;
  }

  async findBySymbolId(symbolId: number): Promise<Trade[]> {
    return this.prisma.trade.findMany({
      where: { symbolId },
      include: this.getFullInclude(),
      orderBy: { dateEntry: 'desc' },
    }) as any;
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Trade[]> {
    return this.prisma.trade.findMany({
      where: {
        dateEntry: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: this.getFullInclude(),
      orderBy: { dateEntry: 'desc' },
    }) as any;
  }

  async update(id: number, data: UpdateTradeDto): Promise<Trade> {
    return this.prisma.trade.update({
      where: { id },
      data,
      include: this.getFullInclude(),
    }) as any;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.trade.delete({
      where: { id },
    });
  }

  private getFullInclude() {
    return {
      symbol: true,
      operationType: true,
      result: true,
      statusOperation: true,
      strategy: true,
      tradeDetail: {
        include: {
          confirmations: {
            include: {
              confirmation: true,
              condition: true,
            },
          },
        },
      },
    };
  }
}