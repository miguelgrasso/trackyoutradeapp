import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IValidator } from '../../common/interfaces/validator.interface';
import { CreateResultDto } from '../dto/create-result.dto';

@Injectable()
export class ResultValidator implements IValidator<CreateResultDto> {
  constructor(private readonly prisma: PrismaService) {}

  async validate(data: CreateResultDto): Promise<void> {
    await this.validateUniqueResult(data.result);
    this.validateLabel(data.label);
    this.validateResult(data.result);
  }

  private async validateUniqueResult(result: string): Promise<void> {
    const existingResult = await this.prisma.result.findFirst({
      where: { result },
    });

    if (existingResult) {
      throw new BadRequestException(`Result with value ${result} already exists`);
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

  private validateResult(result: string): void {
    if (!result || result.trim().length < 2) {
      throw new BadRequestException('Result must be at least 2 characters long');
    }

    if (result.length > 50) {
      throw new BadRequestException('Result cannot exceed 50 characters');
    }

    // Validate result format (can contain letters, numbers, spaces, hyphens, underscores)
    const resultPattern = /^[a-zA-Z0-9\s\-_]+$/;
    if (!resultPattern.test(result)) {
      throw new BadRequestException(
        'Result can only contain letters, numbers, spaces, hyphens, and underscores'
      );
    }
  }
}