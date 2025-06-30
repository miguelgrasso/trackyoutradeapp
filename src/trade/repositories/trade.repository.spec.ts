import { Test, TestingModule } from '@nestjs/testing';
import { TradeRepository } from './trade.repository';
import { PrismaService } from '../../config/prisma.service';
import { CreateTradeDto } from '../dto/create-trade.dto';

describe('TradeRepository', () => {
  let repository: TradeRepository;
  let prismaService: jest.Mocked<PrismaService>;

  const mockPrismaTradeModel = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const mockPrismaService = {
      trade: mockPrismaTradeModel,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradeRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<TradeRepository>(TradeRepository);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a trade with full include', async () => {
      const createDto: CreateTradeDto = {
        symbolId: 1,
        operationTypeId: 1,
        resultId: 1,
        statusOperationId: 1,
        strategyId: 1,
        quantity: 100,
        dateEntry: new Date(),
        priceEntry: 1.2000,
        priceExit: 1.2100,
        spread: 0.0002,
      };

      const expectedTrade = { id: 1, ...createDto };
      mockPrismaTradeModel.create.mockResolvedValue(expectedTrade);

      const result = await repository.create(createDto);

      expect(mockPrismaTradeModel.create).toHaveBeenCalledWith({
        data: {
          symbolId: createDto.symbolId,
          operationTypeId: createDto.operationTypeId,
          resultId: createDto.resultId,
          statusOperationId: createDto.statusOperationId,
          quantity: createDto.quantity,
          dateEntry: createDto.dateEntry,
          priceEntry: createDto.priceEntry,
          priceExit: createDto.priceExit,
          spread: createDto.spread,
          strategyId: createDto.strategyId,
        },
        include: expect.objectContaining({
          symbol: true,
          operationType: true,
          result: true,
          statusOperation: true,
          strategy: true,
          tradeDetail: expect.any(Object),
        }),
      });
      expect(result).toBe(expectedTrade);
    });
  });

  describe('findAllWithRelations', () => {
    it('should find all trades with relations ordered by date', async () => {
      const expectedTrades = [{ id: 1 }, { id: 2 }];
      mockPrismaTradeModel.findMany.mockResolvedValue(expectedTrades);

      const result = await repository.findAllWithRelations();

      expect(mockPrismaTradeModel.findMany).toHaveBeenCalledWith({
        include: expect.objectContaining({
          symbol: true,
          operationType: true,
          result: true,
          statusOperation: true,
          strategy: true,
          tradeDetail: expect.any(Object),
        }),
        orderBy: { dateEntry: 'desc' },
      });
      expect(result).toBe(expectedTrades);
    });
  });

  describe('findByIdWithRelations', () => {
    it('should find a trade by id with relations', async () => {
      const expectedTrade = { id: 1 };
      mockPrismaTradeModel.findUnique.mockResolvedValue(expectedTrade);

      const result = await repository.findByIdWithRelations(1);

      expect(mockPrismaTradeModel.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: expect.objectContaining({
          symbol: true,
          operationType: true,
          result: true,
          statusOperation: true,
          strategy: true,
          tradeDetail: expect.any(Object),
        }),
      });
      expect(result).toBe(expectedTrade);
    });
  });

  describe('findByStrategyId', () => {
    it('should find trades by strategy id', async () => {
      const expectedTrades = [{ id: 1, strategyId: 1 }];
      mockPrismaTradeModel.findMany.mockResolvedValue(expectedTrades);

      const result = await repository.findByStrategyId(1);

      expect(mockPrismaTradeModel.findMany).toHaveBeenCalledWith({
        where: { strategyId: 1 },
        include: expect.any(Object),
        orderBy: { dateEntry: 'desc' },
      });
      expect(result).toBe(expectedTrades);
    });
  });

  describe('findByDateRange', () => {
    it('should find trades within date range', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');
      const expectedTrades = [{ id: 1 }];
      mockPrismaTradeModel.findMany.mockResolvedValue(expectedTrades);

      const result = await repository.findByDateRange(startDate, endDate);

      expect(mockPrismaTradeModel.findMany).toHaveBeenCalledWith({
        where: {
          dateEntry: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: expect.any(Object),
        orderBy: { dateEntry: 'desc' },
      });
      expect(result).toBe(expectedTrades);
    });
  });

  describe('update', () => {
    it('should update a trade with full include', async () => {
      const updateData = { quantity: 200 };
      const expectedTrade = { id: 1, quantity: 200 };
      mockPrismaTradeModel.update.mockResolvedValue(expectedTrade);

      const result = await repository.update(1, updateData);

      expect(mockPrismaTradeModel.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
        include: expect.objectContaining({
          symbol: true,
          operationType: true,
          result: true,
          statusOperation: true,
          strategy: true,
          tradeDetail: expect.any(Object),
        }),
      });
      expect(result).toBe(expectedTrade);
    });
  });

  describe('delete', () => {
    it('should delete a trade', async () => {
      mockPrismaTradeModel.delete.mockResolvedValue({ id: 1 });

      await repository.delete(1);

      expect(mockPrismaTradeModel.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});