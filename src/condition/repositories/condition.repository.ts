import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IConditionRepository } from '../interfaces/condition-repository.interface';
import { Condition } from '../entities/condition.entity';
import { CreateConditionDto } from '../dto/create-condition.dto';
import { UpdateConditionDto } from '../dto/update-condition.dto';

@Injectable()
export class ConditionRepository implements IConditionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateConditionDto): Promise<Condition> {
    return this.prisma.condition.create({
      data,
    });
  }

  async findAll(): Promise<Condition[]> {
    return this.prisma.condition.findMany({
      include: {
        confirmation: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<Condition | null> {
    return this.prisma.condition.findUnique({
      where: { id },
      include: {
        confirmation: true,
      },
    });
  }

  async findByName(name: string): Promise<Condition[]> {
    return this.prisma.condition.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        confirmation: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByConfirmationId(confirmationId: number): Promise<Condition[]> {
    return this.prisma.condition.findMany({
      where: { confirmationId },
      include: {
        confirmation: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByDescription(description: string): Promise<Condition[]> {
    return this.prisma.condition.findMany({
      where: {
        description: {
          contains: description,
          mode: 'insensitive',
        },
      },
      include: {
        confirmation: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findConditionsWithConfirmation(): Promise<Condition[]> {
    return this.prisma.condition.findMany({
      include: {
        confirmation: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, data: UpdateConditionDto): Promise<Condition> {
    return this.prisma.condition.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.condition.delete({
      where: { id },
    });
  }
}