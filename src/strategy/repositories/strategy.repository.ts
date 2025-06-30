import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IStrategyRepository } from '../interfaces/strategy-repository.interface';
import { Strategy } from '../entities/strategy.entity';
import { CreateStrategyDto } from '../dto/create-strategy.dto';
import { UpdateStrategyDto } from '../dto/update-strategy.dto';

@Injectable()
export class StrategyRepository implements IStrategyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStrategyDto): Promise<Strategy> {
    return this.prisma.strategy.create({
      data,
    });
  }

  async findAll(): Promise<Strategy[]> {
    return this.prisma.strategy.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllWithRelations(): Promise<Strategy[]> {
    return this.prisma.strategy.findMany({
      include: this.getFullInclude(),
      orderBy: { createdAt: 'desc' },
    }) as any;
  }

  async findById(id: number): Promise<Strategy | null> {
    return this.prisma.strategy.findUnique({
      where: { id },
    });
  }

  async findByIdWithRelations(id: number): Promise<Strategy | null> {
    return this.prisma.strategy.findUnique({
      where: { id },
      include: this.getFullInclude(),
    }) as any;
  }

  async findByStatus(status: string): Promise<Strategy[]> {
    return this.prisma.strategy.findMany({
      where: { status },
      include: this.getFullInclude(),
      orderBy: { createdAt: 'desc' },
    }) as any;
  }

  async countTradesByStrategy(strategyId: number): Promise<number> {
    return this.prisma.trade.count({
      where: { strategyId },
    });
  }

  async update(id: number, data: UpdateStrategyDto): Promise<Strategy> {
    return this.prisma.strategy.update({
      where: { id },
      data,
      include: this.getFullInclude(),
    }) as any;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.strategy.delete({
      where: { id },
    });
  }

  private getFullInclude() {
    return {
      strategyConfirmations: {
        include: {
          confirmation: {
            include: {
              conditions: true,
            },
          },
        },
      },
      trades: {
        include: {
          symbol: true,
          operationType: true,
          result: true,
          statusOperation: true,
        },
      },
    };
  }
}