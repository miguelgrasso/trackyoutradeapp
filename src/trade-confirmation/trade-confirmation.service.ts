import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreateTradeConfirmationDto } from './dto/create-trade-confirmation.dto';
import { UpdateTradeConfirmationDto } from './dto/update-trade-confirmation.dto';

@Injectable()
export class TradeConfirmationService {
  constructor(private prisma: PrismaService) {}

  async create(createTradeConfirmationDto: CreateTradeConfirmationDto) {
    // Verificar que exista el tradeDetail
    const tradeDetail = await this.prisma.tradeDetail.findUnique({
      where: { id: createTradeConfirmationDto.tradeDetailId }
    });

    if (!tradeDetail) {
      throw new NotFoundException(`TradeDetail with ID ${createTradeConfirmationDto.tradeDetailId} not found`);
    }

    // Verificar que exista la confirmación
    const confirmation = await this.prisma.confirmation.findUnique({
      where: { id: createTradeConfirmationDto.confirmationId }
    });

    if (!confirmation) {
      throw new NotFoundException(`Confirmation with ID ${createTradeConfirmationDto.confirmationId} not found`);
    }

    // Verificar que exista la condición
    const condition = await this.prisma.condition.findUnique({
      where: { id: createTradeConfirmationDto.conditionId }
    });

    if (!condition) {
      throw new NotFoundException(`Condition with ID ${createTradeConfirmationDto.conditionId} not found`);
    }

    // Crear la confirmación del trade
    return this.prisma.tradeConfirmation.create({
      data: createTradeConfirmationDto,
      include: {
        confirmation: true,
        condition: true
      }
    });
  }

  async findAll() {
    return this.prisma.tradeConfirmation.findMany({
      include: {
        confirmation: true,
        condition: true
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.tradeConfirmation.findUnique({
      where: { id },
      include: {
        confirmation: true,
        condition: true
      }
    });
  }

  async findByTradeDetailId(tradeDetailId: number) {
    return this.prisma.tradeConfirmation.findMany({
      where: { tradeDetailId },
      include: {
        confirmation: true,
        condition: true
      }
    });
  }

  async update(id: number, updateTradeConfirmationDto: UpdateTradeConfirmationDto) {
    // Verificar que existe el registro
    const tradeConfirmation = await this.prisma.tradeConfirmation.findUnique({
      where: { id }
    });

    if (!tradeConfirmation) {
      throw new NotFoundException(`TradeConfirmation with ID ${id} not found`);
    }

    return this.prisma.tradeConfirmation.update({
      where: { id },
      data: updateTradeConfirmationDto,
      include: {
        confirmation: true,
        condition: true
      }
    });
  }

  async remove(id: number) {
    // Verificar que existe el registro
    const tradeConfirmation = await this.prisma.tradeConfirmation.findUnique({
      where: { id }
    });

    if (!tradeConfirmation) {
      throw new NotFoundException(`TradeConfirmation with ID ${id} not found`);
    }

    return this.prisma.tradeConfirmation.delete({
      where: { id }
    });
  }
} 