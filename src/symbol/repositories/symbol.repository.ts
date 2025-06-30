import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { ISymbolRepository } from '../interfaces/symbol-repository.interface';
import { Symbol } from '../entities/symbol.entity';
import { CreateSymbolDto } from '../dto/create-symbol.dto';
import { UpdateSymbolDto } from '../dto/update-symbol.dto';

@Injectable()
export class SymbolRepository implements ISymbolRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSymbolDto): Promise<Symbol> {
    return this.prisma.symbol.create({
      data,
    });
  }

  async findAll(): Promise<Symbol[]> {
    return this.prisma.symbol.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<Symbol | null> {
    return this.prisma.symbol.findUnique({
      where: { id },
    });
  }

  async findByCodeSymbol(codeSymbol: string): Promise<Symbol | null> {
    return this.prisma.symbol.findFirst({
      where: { codeSymbol },
    });
  }

  async findByLabel(label: string): Promise<Symbol[]> {
    return this.prisma.symbol.findMany({
      where: {
        label: {
          contains: label,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findActiveSymbols(): Promise<Symbol[]> {
    return this.prisma.symbol.findMany({
      where: {
        trades: {
          some: {},
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, data: UpdateSymbolDto): Promise<Symbol> {
    return this.prisma.symbol.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.symbol.delete({
      where: { id },
    });
  }
}