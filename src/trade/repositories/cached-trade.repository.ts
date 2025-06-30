import { Injectable } from '@nestjs/common';
import { ITradeRepository } from '../interfaces/trade-repository.interface';
import { Trade } from '../entities/trade.entity';
import { CreateTradeDto } from '../dto/create-trade.dto';
import { UpdateTradeDto } from '../dto/update-trade.dto';
import { CacheService } from '../../common/caching/cache.service';
import { Cacheable, CacheEvict } from '../../common/decorators/cacheable.decorator';

@Injectable()
export class CachedTradeRepository implements ITradeRepository {
  constructor(
    private readonly baseRepository: ITradeRepository,
    private readonly cacheService: CacheService
  ) {}

  async create(data: CreateTradeDto): Promise<Trade> {
    const trade = await this.baseRepository.create(data);
    
    // Evict cache patterns that might be affected
    await this.cacheService.deletePattern('TradeRepository:findAll*');
    await this.cacheService.deletePattern('TradeRepository:findByStrategy*');
    await this.cacheService.deletePattern('TradeRepository:findBySymbol*');
    
    return trade;
  }

  @Cacheable({ ttl: 300, prefix: 'TradeRepository:findAll' })
  async findAll(): Promise<Trade[]> {
    return this.baseRepository.findAll();
  }

  @Cacheable({ ttl: 300, prefix: 'TradeRepository:findAllWithRelations' })
  async findAllWithRelations(): Promise<Trade[]> {
    return this.baseRepository.findAllWithRelations();
  }

  @Cacheable({ 
    ttl: 600, 
    keyGenerator: (id: number) => `TradeRepository:findById:${id}` 
  })
  async findById(id: number): Promise<Trade | null> {
    return this.baseRepository.findById(id);
  }

  @Cacheable({ 
    ttl: 600, 
    keyGenerator: (id: number) => `TradeRepository:findByIdWithRelations:${id}` 
  })
  async findByIdWithRelations(id: number): Promise<Trade | null> {
    return this.baseRepository.findByIdWithRelations(id);
  }

  @Cacheable({ 
    ttl: 300, 
    keyGenerator: (strategyId: number) => `TradeRepository:findByStrategy:${strategyId}` 
  })
  async findByStrategyId(strategyId: number): Promise<Trade[]> {
    return this.baseRepository.findByStrategyId(strategyId);
  }

  @Cacheable({ 
    ttl: 300, 
    keyGenerator: (symbolId: number) => `TradeRepository:findBySymbol:${symbolId}` 
  })
  async findBySymbolId(symbolId: number): Promise<Trade[]> {
    return this.baseRepository.findBySymbolId(symbolId);
  }

  @Cacheable({ 
    ttl: 180, // Shorter TTL for date-based queries
    keyGenerator: (startDate: Date, endDate: Date) => 
      `TradeRepository:findByDateRange:${startDate.toISOString()}:${endDate.toISOString()}` 
  })
  async findByDateRange(startDate: Date, endDate: Date): Promise<Trade[]> {
    return this.baseRepository.findByDateRange(startDate, endDate);
  }

  async update(id: number, data: UpdateTradeDto): Promise<Trade> {
    const trade = await this.baseRepository.update(id, data);
    
    // Evict specific cache entries
    await this.cacheService.delete(`TradeRepository:findById:${id}`);
    await this.cacheService.delete(`TradeRepository:findByIdWithRelations:${id}`);
    await this.cacheService.deletePattern('TradeRepository:findAll*');
    await this.cacheService.deletePattern('TradeRepository:findByStrategy*');
    await this.cacheService.deletePattern('TradeRepository:findBySymbol*');
    await this.cacheService.deletePattern('TradeRepository:findByDateRange*');
    
    return trade;
  }

  async delete(id: number): Promise<void> {
    await this.baseRepository.delete(id);
    
    // Evict specific cache entries
    await this.cacheService.delete(`TradeRepository:findById:${id}`);
    await this.cacheService.delete(`TradeRepository:findByIdWithRelations:${id}`);
    await this.cacheService.deletePattern('TradeRepository:findAll*');
    await this.cacheService.deletePattern('TradeRepository:findByStrategy*');
    await this.cacheService.deletePattern('TradeRepository:findBySymbol*');
    await this.cacheService.deletePattern('TradeRepository:findByDateRange*');
  }
}