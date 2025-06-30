import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TradeService } from './trade.service';
import { ITradeRepository } from './interfaces/trade-repository.interface';
import { ValidationService } from '../common/services/validation.service';
import { IValidator } from '../common/interfaces/validator.interface';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';

describe('TradeService', () => {
  let service: TradeService;
  let mockRepository: jest.Mocked<ITradeRepository>;
  let mockValidationService: jest.Mocked<ValidationService>;
  let mockValidators: jest.Mocked<IValidator<CreateTradeDto>>[];

  const mockTrade: Trade = {
    id: 1,
    symbolId: 1,
    operationTypeId: 1,
    resultId: 1,
    statusOperationId: 1,
    strategyId: 1,
    quantity: 100,
    dateEntry: new Date('2024-01-01'),
    priceEntry: 1.2000,
    priceExit: 1.2100,
    spread: 0.0002,
    symbol: { id: 1, codeSymbol: 'EUR/USD', label: 'Euro/Dollar', createdAt: new Date() } as any,
    operationType: { id: 1, label: 'Buy', operation: 'BUY', createdAt: new Date() } as any,
    result: { id: 1, label: 'Profit', result: 'PROFIT', createdAt: new Date() } as any,
    statusOperation: { id: 1, label: 'Closed', status: 'CLOSED', createdAt: new Date() } as any,
    strategy: { id: 1, name: 'Test Strategy', description: 'Test', createdAt: new Date(), status: 'active' } as any,
    tradeDetail: undefined,
  };

  const mockCreateTradeDto: CreateTradeDto = {
    symbolId: 1,
    operationTypeId: 1,
    resultId: 1,
    statusOperationId: 1,
    strategyId: 1,
    quantity: 100,
    dateEntry: new Date('2024-01-01'),
    priceEntry: 1.2000,
    priceExit: 1.2100,
    spread: 0.0002,
  };

  beforeEach(async () => {
    // Create mocks
    mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findAllWithRelations: jest.fn(),
      findById: jest.fn(),
      findByIdWithRelations: jest.fn(),
      findByStrategyId: jest.fn(),
      findBySymbolId: jest.fn(),
      findByDateRange: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    mockValidationService = {
      validateWithValidators: jest.fn(),
    };

    mockValidators = [
      { validate: jest.fn() },
      { validate: jest.fn() },
    ];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradeService,
        {
          provide: 'ITradeRepository',
          useValue: mockRepository,
        },
        {
          provide: ValidationService,
          useValue: mockValidationService,
        },
        {
          provide: 'TRADE_VALIDATORS',
          useValue: mockValidators,
        },
      ],
    }).compile();

    service = module.get<TradeService>(TradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a trade successfully', async () => {
      mockValidationService.validateWithValidators.mockResolvedValue(undefined);
      mockRepository.create.mockResolvedValue(mockTrade);

      const result = await service.create(mockCreateTradeDto);

      expect(mockValidationService.validateWithValidators).toHaveBeenCalledWith(
        mockCreateTradeDto,
        mockValidators
      );
      expect(mockRepository.create).toHaveBeenCalledWith(mockCreateTradeDto);
      expect(result).toBe(mockTrade);
    });

    it('should throw error when validation fails', async () => {
      const validationError = new Error('Validation failed');
      mockValidationService.validateWithValidators.mockRejectedValue(validationError);

      await expect(service.create(mockCreateTradeDto)).rejects.toThrow('Validation failed');
      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all trades with relations', async () => {
      const trades = [mockTrade];
      mockRepository.findAllWithRelations.mockResolvedValue(trades);

      const result = await service.findAll();

      expect(mockRepository.findAllWithRelations).toHaveBeenCalled();
      expect(result).toBe(trades);
    });
  });

  describe('findOne', () => {
    it('should return a trade when found', async () => {
      mockRepository.findByIdWithRelations.mockResolvedValue(mockTrade);

      const result = await service.findOne(1);

      expect(mockRepository.findByIdWithRelations).toHaveBeenCalledWith(1);
      expect(result).toBe(mockTrade);
    });

    it('should throw NotFoundException when trade not found', async () => {
      mockRepository.findByIdWithRelations.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findByIdWithRelations).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    const updateDto: UpdateTradeDto = { quantity: 200 };

    it('should update a trade successfully', async () => {
      mockRepository.findByIdWithRelations.mockResolvedValue(mockTrade);
      mockRepository.update.mockResolvedValue({ ...mockTrade, quantity: 200 });

      const result = await service.update(1, updateDto);

      expect(mockRepository.findByIdWithRelations).toHaveBeenCalledWith(1);
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateDto);
      expect(result.quantity).toBe(200);
    });

    it('should throw NotFoundException when trade not found', async () => {
      mockRepository.findByIdWithRelations.mockResolvedValue(null);

      await expect(service.update(999, updateDto)).rejects.toThrow(NotFoundException);
      expect(mockRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a trade successfully', async () => {
      mockRepository.findByIdWithRelations.mockResolvedValue(mockTrade);
      mockRepository.delete.mockResolvedValue(undefined);

      await service.remove(1);

      expect(mockRepository.findByIdWithRelations).toHaveBeenCalledWith(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when trade not found', async () => {
      mockRepository.findByIdWithRelations.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe('additional methods', () => {
    it('should find trades by strategy', async () => {
      const trades = [mockTrade];
      mockRepository.findByStrategyId.mockResolvedValue(trades);

      const result = await service.findByStrategy(1);

      expect(mockRepository.findByStrategyId).toHaveBeenCalledWith(1);
      expect(result).toBe(trades);
    });

    it('should find trades by symbol', async () => {
      const trades = [mockTrade];
      mockRepository.findBySymbolId.mockResolvedValue(trades);

      const result = await service.findBySymbol(1);

      expect(mockRepository.findBySymbolId).toHaveBeenCalledWith(1);
      expect(result).toBe(trades);
    });

    it('should find trades by date range', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');
      const trades = [mockTrade];
      mockRepository.findByDateRange.mockResolvedValue(trades);

      const result = await service.findByDateRange(startDate, endDate);

      expect(mockRepository.findByDateRange).toHaveBeenCalledWith(startDate, endDate);
      expect(result).toBe(trades);
    });
  });
});