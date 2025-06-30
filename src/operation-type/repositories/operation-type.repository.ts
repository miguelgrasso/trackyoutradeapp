import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IOperationTypeRepository } from '../interfaces/operation-type-repository.interface';
import { OperationType } from '../entities/operation-type.entity';
import { CreateOperationTypeDto } from '../dto/create-operation-type.dto';
import { UpdateOperationTypeDto } from '../dto/update-operation-type.dto';

@Injectable()
export class OperationTypeRepository implements IOperationTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOperationTypeDto): Promise<OperationType> {
    return this.prisma.operationType.create({
      data,
    });
  }

  async findAll(): Promise<OperationType[]> {
    return this.prisma.operationType.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<OperationType | null> {
    return this.prisma.operationType.findUnique({
      where: { id },
    });
  }

  async findByOperation(operation: string): Promise<OperationType | null> {
    return this.prisma.operationType.findFirst({
      where: { operation },
    });
  }

  async findByLabel(label: string): Promise<OperationType[]> {
    return this.prisma.operationType.findMany({
      where: {
        label: {
          contains: label,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findActiveOperationTypes(): Promise<OperationType[]> {
    return this.prisma.operationType.findMany({
      where: {
        trades: {
          some: {},
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, data: UpdateOperationTypeDto): Promise<OperationType> {
    return this.prisma.operationType.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.operationType.delete({
      where: { id },
    });
  }
}