import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IValidator } from '../../common/interfaces/validator.interface';
import { CreateOperationTypeDto } from '../dto/create-operation-type.dto';

@Injectable()
export class OperationTypeValidator implements IValidator<CreateOperationTypeDto> {
  constructor(private readonly prisma: PrismaService) {}

  async validate(data: CreateOperationTypeDto): Promise<void> {
    await this.validateUniqueOperation(data.operation);
    this.validateLabel(data.label);
    this.validateOperation(data.operation);
  }

  private async validateUniqueOperation(operation: string): Promise<void> {
    const existingOperationType = await this.prisma.operationType.findFirst({
      where: { operation },
    });

    if (existingOperationType) {
      throw new BadRequestException(`Operation type with operation ${operation} already exists`);
    }
  }

  private validateLabel(label: string): void {
    if (!label || label.trim().length < 2) {
      throw new BadRequestException('Label must be at least 2 characters long');
    }

    if (label.length > 100) {
      throw new BadRequestException('Label cannot exceed 100 characters');
    }
  }

  private validateOperation(operation: string): void {
    if (!operation || operation.trim().length < 2) {
      throw new BadRequestException('Operation must be at least 2 characters long');
    }

    if (operation.length > 50) {
      throw new BadRequestException('Operation cannot exceed 50 characters');
    }

    // Validate operation format (can contain letters, numbers, spaces, hyphens, underscores)
    const operationPattern = /^[a-zA-Z0-9\s\-_]+$/;
    if (!operationPattern.test(operation)) {
      throw new BadRequestException(
        'Operation can only contain letters, numbers, spaces, hyphens, and underscores'
      );
    }

    // Validate common operation types
    const allowedOperations = ['BUY', 'SELL', 'LONG', 'SHORT', 'HOLD', 'CLOSE'];
    const upperOperation = operation.toUpperCase();
    if (!allowedOperations.some(allowed => upperOperation.includes(allowed))) {
      throw new BadRequestException(
        `Operation must be a valid trading operation type (${allowedOperations.join(', ')})`
      );
    }
  }
}