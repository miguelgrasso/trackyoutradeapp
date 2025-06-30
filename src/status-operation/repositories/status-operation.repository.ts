import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IStatusOperationRepository } from '../interfaces/status-operation-repository.interface';
import { StatusOperation } from '../entities/status-operation.entity';
import { CreateStatusOperationDto } from '../dto/create-status-operation.dto';
import { UpdateStatusOperationDto } from '../dto/update-status-operation.dto';

@Injectable()
export class StatusOperationRepository implements IStatusOperationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStatusOperationDto): Promise<StatusOperation> {
    return this.prisma.statusOperation.create({
      data,
    });
  }

  async findAll(): Promise<StatusOperation[]> {
    return this.prisma.statusOperation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<StatusOperation | null> {
    return this.prisma.statusOperation.findUnique({
      where: { id },
    });
  }

  async findByStatus(status: string): Promise<StatusOperation | null> {
    return this.prisma.statusOperation.findFirst({
      where: { status },
    });
  }

  async findByLabel(label: string): Promise<StatusOperation[]> {
    return this.prisma.statusOperation.findMany({
      where: {
        label: {
          contains: label,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findActiveStatuses(): Promise<StatusOperation[]> {
    return this.prisma.statusOperation.findMany({
      where: {
        trades: {
          some: {},
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, data: UpdateStatusOperationDto): Promise<StatusOperation> {
    return this.prisma.statusOperation.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.statusOperation.delete({
      where: { id },
    });
  }
}