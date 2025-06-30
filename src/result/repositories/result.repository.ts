import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IResultRepository } from '../interfaces/result-repository.interface';
import { Result } from '../entities/result.entity';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';

@Injectable()
export class ResultRepository implements IResultRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateResultDto): Promise<Result> {
    return this.prisma.result.create({
      data,
    });
  }

  async findAll(): Promise<Result[]> {
    return this.prisma.result.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<Result | null> {
    return this.prisma.result.findUnique({
      where: { id },
    });
  }

  async findByResult(result: string): Promise<Result | null> {
    return this.prisma.result.findFirst({
      where: { result },
    });
  }

  async findByLabel(label: string): Promise<Result[]> {
    return this.prisma.result.findMany({
      where: {
        label: {
          contains: label,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, data: UpdateResultDto): Promise<Result> {
    return this.prisma.result.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.result.delete({
      where: { id },
    });
  }
}