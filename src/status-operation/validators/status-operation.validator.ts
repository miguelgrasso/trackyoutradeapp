import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IValidator } from '../../common/interfaces/validator.interface';
import { CreateStatusOperationDto } from '../dto/create-status-operation.dto';

@Injectable()
export class StatusOperationValidator implements IValidator<CreateStatusOperationDto> {
  constructor(private readonly prisma: PrismaService) {}

  async validate(data: CreateStatusOperationDto): Promise<void> {
    await this.validateUniqueStatus(data.status);
    this.validateLabel(data.label);
    this.validateStatus(data.status);
  }

  private async validateUniqueStatus(status: string): Promise<void> {
    const existingStatusOperation = await this.prisma.statusOperation.findFirst({
      where: { status },
    });

    if (existingStatusOperation) {
      throw new BadRequestException(`Status operation with status ${status} already exists`);
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

  private validateStatus(status: string): void {
    if (!status || status.trim().length < 2) {
      throw new BadRequestException('Status must be at least 2 characters long');
    }

    if (status.length > 50) {
      throw new BadRequestException('Status cannot exceed 50 characters');
    }

    // Validate status format (can contain letters, numbers, spaces, hyphens, underscores)
    const statusPattern = /^[a-zA-Z0-9\s\-_]+$/;
    if (!statusPattern.test(status)) {
      throw new BadRequestException(
        'Status can only contain letters, numbers, spaces, hyphens, and underscores'
      );
    }

    // Validate common status types
    const allowedStatuses = ['PENDING', 'OPEN', 'CLOSED', 'CANCELLED', 'EXECUTED', 'FILLED', 'PARTIAL'];
    const upperStatus = status.toUpperCase();
    if (!allowedStatuses.some(allowed => upperStatus.includes(allowed))) {
      throw new BadRequestException(
        `Status must be a valid trading status (${allowedStatuses.join(', ')})`
      );
    }
  }
}