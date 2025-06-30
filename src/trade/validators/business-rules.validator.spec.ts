import { BadRequestException } from '@nestjs/common';
import { BusinessRulesValidator } from './business-rules.validator';
import { CreateTradeDto } from '../dto/create-trade.dto';

describe('BusinessRulesValidator', () => {
  let validator: BusinessRulesValidator;

  beforeEach(() => {
    validator = new BusinessRulesValidator();
  });

  const createValidDto = (): CreateTradeDto => ({
    symbolId: 1,
    operationTypeId: 1,
    resultId: 1,
    statusOperationId: 1,
    strategyId: 1,
    quantity: 100,
    dateEntry: new Date(), // Use current date to avoid the "1 year ago" validation
    priceEntry: 1.2000,
    priceExit: 1.2100,
    spread: 0.0002,
  });

  it('should validate successfully with valid data', async () => {
    const dto = createValidDto();

    await expect(validator.validate(dto)).resolves.not.toThrow();
  });

  describe('price validation', () => {
    it('should throw error when entry price is zero or negative', async () => {
      const dto = createValidDto();
      dto.priceEntry = 0;

      await expect(validator.validate(dto)).rejects.toThrow(
        new BadRequestException('Entry price must be greater than 0')
      );
    });

    it('should throw error when exit price is zero or negative', async () => {
      const dto = createValidDto();
      dto.priceExit = -1;

      await expect(validator.validate(dto)).rejects.toThrow(
        new BadRequestException('Exit price must be greater than 0')
      );
    });

    it('should throw error when entry and exit prices are the same', async () => {
      const dto = createValidDto();
      dto.priceEntry = 1.2000;
      dto.priceExit = 1.2000;

      await expect(validator.validate(dto)).rejects.toThrow(
        new BadRequestException('Entry and exit prices cannot be the same')
      );
    });
  });

  describe('quantity validation', () => {
    it('should throw error when quantity is zero or negative', async () => {
      const dto = createValidDto();
      dto.quantity = 0;

      await expect(validator.validate(dto)).rejects.toThrow(
        new BadRequestException('Quantity must be greater than 0')
      );
    });

    it('should throw error when quantity exceeds maximum', async () => {
      const dto = createValidDto();
      dto.quantity = 1000001;

      await expect(validator.validate(dto)).rejects.toThrow(
        new BadRequestException('Quantity cannot exceed 1,000,000 units')
      );
    });
  });

  describe('date validation', () => {
    it('should throw error when entry date is in the future', async () => {
      const dto = createValidDto();
      dto.dateEntry = new Date(Date.now() + 86400000); // Tomorrow

      await expect(validator.validate(dto)).rejects.toThrow(
        new BadRequestException('Entry date cannot be in the future')
      );
    });

    it('should throw error when entry date is more than 1 year ago', async () => {
      const dto = createValidDto();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      oneYearAgo.setDate(oneYearAgo.getDate() - 1); // 1 day more than a year
      dto.dateEntry = oneYearAgo;

      await expect(validator.validate(dto)).rejects.toThrow(
        new BadRequestException('Entry date cannot be more than 1 year ago')
      );
    });
  });

  describe('spread validation', () => {
    it('should throw error when spread is negative', async () => {
      const dto = createValidDto();
      dto.spread = -0.001;

      await expect(validator.validate(dto)).rejects.toThrow(
        new BadRequestException('Spread cannot be negative')
      );
    });

    it('should throw error when spread is greater than price difference', async () => {
      const dto = createValidDto();
      dto.priceEntry = 1.2000;
      dto.priceExit = 1.2050;
      dto.spread = 0.0100; // Greater than 0.0050 difference

      await expect(validator.validate(dto)).rejects.toThrow(
        new BadRequestException('Spread cannot be greater than the price difference')
      );
    });
  });
});