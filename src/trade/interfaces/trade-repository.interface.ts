import { Trade } from '../entities/trade.entity';
import { CreateTradeDto } from '../dto/create-trade.dto';
import { UpdateTradeDto } from '../dto/update-trade.dto';
import { IBaseRepository } from '../../common/interfaces/repository.interface';

export interface ITradeRepository extends IBaseRepository<Trade, CreateTradeDto, UpdateTradeDto> {
  findAllWithRelations(): Promise<Trade[]>;
  findByIdWithRelations(id: number): Promise<Trade | null>;
  findByStrategyId(strategyId: number): Promise<Trade[]>;
  findBySymbolId(symbolId: number): Promise<Trade[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Trade[]>;
}