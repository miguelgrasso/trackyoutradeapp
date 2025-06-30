import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IValidator } from '../../common/interfaces/validator.interface';
import { CreateSymbolDto } from '../dto/create-symbol.dto';

@Injectable()
export class SymbolValidator implements IValidator<CreateSymbolDto> {
  constructor(private readonly prisma: PrismaService) {}

  async validate(data: CreateSymbolDto): Promise<void> {
    await this.validateUniqueCodeSymbol(data.codeSymbol);
    this.validateCodeSymbolFormat(data.codeSymbol);
    this.validateLabel(data.label);
  }

  private async validateUniqueCodeSymbol(codeSymbol: string): Promise<void> {
    const existingSymbol = await this.prisma.symbol.findFirst({
      where: { codeSymbol },
    });

    if (existingSymbol) {
      throw new BadRequestException(`Symbol with code ${codeSymbol} already exists`);
    }
  }

  private validateCodeSymbolFormat(codeSymbol: string): void {
    const symbolPattern = /^[A-Z]{3,6}(\/[A-Z]{3,6})?$/;
    if (!symbolPattern.test(codeSymbol)) {
      throw new BadRequestException(
        'Symbol code must be in format: EUR/USD, EURUSD, BTC, etc.'
      );
    }
  }

  private validateLabel(label: string): void {
    if (label.trim().length < 3) {
      throw new BadRequestException('Label must be at least 3 characters long');
    }

    if (label.length > 100) {
      throw new BadRequestException('Label cannot exceed 100 characters');
    }
  }
}