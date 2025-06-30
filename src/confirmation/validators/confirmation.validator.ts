import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IValidator } from '../../common/interfaces/validator.interface';
import { CreateConfirmationDto } from '../dto/create-confirmation.dto';

@Injectable()
export class ConfirmationValidator implements IValidator<CreateConfirmationDto> {
  constructor(private readonly prisma: PrismaService) {}

  async validate(data: CreateConfirmationDto): Promise<void> {
    await this.validateUniqueName(data.name);
    this.validateName(data.name);
    this.validateDescription(data.description);
  }

  private async validateUniqueName(name: string): Promise<void> {
    const existingConfirmation = await this.prisma.confirmation.findFirst({
      where: { name },
    });

    if (existingConfirmation) {
      throw new BadRequestException(`Confirmation with name ${name} already exists`);
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
}