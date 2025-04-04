import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  async create(createStrategyDto: CreateStrategyDto) {
    return this.prisma.strategy.create({
      data: createStrategyDto,
    });
  }

  findAll() {
    return this.prisma.strategy.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.strategy.findUnique({
      where: { id },
    });
  }

  update(id: number, updateStrategyDto: UpdateStrategyDto) {
    return this.prisma.strategy.update({
      where: { id },
      data: updateStrategyDto,
    });
  }

  remove(id: number) {
    return this.prisma.strategy.delete({
      where: { id },
    });
  }
} 