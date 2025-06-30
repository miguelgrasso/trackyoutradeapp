import { Injectable, BadRequestException } from '@nestjs/common';
import { IValidator } from '../../common/interfaces/validator.interface';
import { CreateTradeDto } from '../dto/create-trade.dto';

@Injectable()
export class BusinessRulesValidator implements IValidator<CreateTradeDto> {
  async validate(data: CreateTradeDto): Promise<void> {
    this.validatePrices(data);
    this.validateQuantity(data);
    this.validateDateEntry(data);
    this.validateSpread(data);
  }

  private validatePrices(data: CreateTradeDto): void {
    if (data.priceEntry <= 0) {
      throw new BadRequestException('Entry price must be greater than 0');
    }

    if (data.priceExit <= 0) {
      throw new BadRequestException('Exit price must be greater than 0');
    }

    if (data.priceEntry === data.priceExit) {
      throw new BadRequestException('Entry and exit prices cannot be the same');
    }
  }

  private validateQuantity(data: CreateTradeDto): void {
    if (data.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    if (data.quantity > 1000000) {
      throw new BadRequestException('Quantity cannot exceed 1,000,000 units');
    }
  }

  private validateDateEntry(data: CreateTradeDto): void {
    const now = new Date();
    const entryDate = new Date(data.dateEntry);

    if (entryDate > now) {
      throw new BadRequestException('Entry date cannot be in the future');
    }

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    if (entryDate < oneYearAgo) {
      throw new BadRequestException('Entry date cannot be more than 1 year ago');
    }
  }

  private validateSpread(data: CreateTradeDto): void {
    if (data.spread < 0) {
      throw new BadRequestException('Spread cannot be negative');
    }

    if (data.spread > Math.abs(data.priceExit - data.priceEntry)) {
      throw new BadRequestException('Spread cannot be greater than the price difference');
    }
  }
}