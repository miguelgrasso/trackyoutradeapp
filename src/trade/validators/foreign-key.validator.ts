import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IValidator } from '../../common/interfaces/validator.interface';
import { CreateTradeDto } from '../dto/create-trade.dto';

@Injectable()
export class ForeignKeyValidator implements IValidator<CreateTradeDto> {
  constructor(private readonly prisma: PrismaService) {}

  async validate(data: CreateTradeDto): Promise<void> {
    const validations: Promise<void>[] = [];

    if (data.symbolId) {
      validations.push(this.validateSymbol(data.symbolId));
    }

    if (data.operationTypeId) {
      validations.push(this.validateOperationType(data.operationTypeId));
    }

    if (data.resultId) {
      validations.push(this.validateResult(data.resultId));
    }

    if (data.statusOperationId) {
      validations.push(this.validateStatusOperation(data.statusOperationId));
    }

    if (data.strategyId) {
      validations.push(this.validateStrategy(data.strategyId));
    }

    await Promise.all(validations);
  }

  private async validateSymbol(symbolId: number): Promise<void> {
    const symbol = await this.prisma.symbol.findUnique({ where: { id: symbolId } });
    if (!symbol) {
      throw new BadRequestException(`Symbol with ID ${symbolId} not found`);
    }
  }

  private async validateOperationType(operationTypeId: number): Promise<void> {
    const operationType = await this.prisma.operationType.findUnique({ 
      where: { id: operationTypeId } 
    });
    if (!operationType) {
      throw new BadRequestException(`OperationType with ID ${operationTypeId} not found`);
    }
  }

  private async validateResult(resultId: number): Promise<void> {
    const result = await this.prisma.result.findUnique({ where: { id: resultId } });
    if (!result) {
      throw new BadRequestException(`Result with ID ${resultId} not found`);
    }
  }

  private async validateStatusOperation(statusOperationId: number): Promise<void> {
    const statusOperation = await this.prisma.statusOperation.findUnique({ 
      where: { id: statusOperationId } 
    });
    if (!statusOperation) {
      throw new BadRequestException(`StatusOperation with ID ${statusOperationId} not found`);
    }
  }

  private async validateStrategy(strategyId: number): Promise<void> {
    const strategy = await this.prisma.strategy.findUnique({ where: { id: strategyId } });
    if (!strategy) {
      throw new BadRequestException(`Strategy with ID ${strategyId} not found`);
    }
  }
}