import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IConfirmationRepository } from '../interfaces/confirmation-repository.interface';
import { Confirmation } from '../entities/confirmation.entity';
import { CreateConfirmationDto } from '../dto/create-confirmation.dto';
import { UpdateConfirmationDto } from '../dto/update-confirmation.dto';
import { Condition } from '../../condition/entities/condition.entity';

@Injectable()
export class ConfirmationRepository implements IConfirmationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateConfirmationDto): Promise<Confirmation> {
    return this.prisma.confirmation.create({
      data,
    });
  }

  async findAll(): Promise<Confirmation[]> {
    return this.prisma.confirmation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<Confirmation | null> {
    return this.prisma.confirmation.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Confirmation | null> {
    return this.prisma.confirmation.findFirst({
      where: { name },
    });
  }

  async findByDescription(description: string): Promise<Confirmation[]> {
    return this.prisma.confirmation.findMany({
      where: {
        description: {
          contains: description,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findConditions(confirmationId: number): Promise<Condition[]> {
    return this.prisma.condition.findMany({
      where: { confirmationId },
      include: {
        confirmation: true,
      },
    });
  }

  async findConfirmationsWithConditions(): Promise<Confirmation[]> {
    return this.prisma.confirmation.findMany({
      include: {
        conditions: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, data: UpdateConfirmationDto): Promise<Confirmation> {
    return this.prisma.confirmation.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.confirmation.delete({
      where: { id },
    });
  }
}