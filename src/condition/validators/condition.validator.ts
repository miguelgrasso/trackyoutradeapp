import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IValidator } from '../../common/interfaces/validator.interface';
import { CreateConditionDto } from '../dto/create-condition.dto';

@Injectable()
export class ConditionValidator implements IValidator<CreateConditionDto> {
  constructor(private readonly prisma: PrismaService) {}

  async validate(data: CreateConditionDto): Promise<void> {
    await this.validateConfirmationExists(data.confirmationId);
    this.validateName(data.name);
    this.validateDescription(data.description);
    this.validateConfirmationId(data.confirmationId);
  }

  private async validateConfirmationExists(confirmationId: number): Promise<void> {
    const confirmation = await this.prisma.confirmation.findUnique({
      where: { id: confirmationId },
    });

    if (!confirmation) {
      throw new BadRequestException(`Confirmation with ID ${confirmationId} does not exist`);
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 3) {
      throw new BadRequestException('Name must be at least 3 characters long');
    }

    if (name.length > 100) {
      throw new BadRequestException('Name cannot exceed 100 characters');
    }

    // Validate name format (letters, numbers, spaces, hyphens, underscores only)
    const namePattern = /^[a-zA-Z0-9\s\-_]+$/;
    if (!namePattern.test(name)) {
      throw new BadRequestException(
        'Name can only contain letters, numbers, spaces, hyphens, and underscores'
      );
    }
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length < 10) {
      throw new BadRequestException('Description must be at least 10 characters long');
    }

    if (description.length > 500) {
      throw new BadRequestException('Description cannot exceed 500 characters');
    }

    // Check for meaningful content
    const words = description.trim().split(/\s+/);
    if (words.length < 3) {
      throw new BadRequestException('Description must contain at least 3 words');
    }
  }

  private validateConfirmationId(confirmationId: number): void {
    if (!confirmationId || !Number.isInteger(confirmationId) || confirmationId <= 0) {
      throw new BadRequestException('Confirmation ID must be a positive integer');
    }
  }
}