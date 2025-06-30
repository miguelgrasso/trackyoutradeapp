import { Strategy } from '../entities/strategy.entity';
import { CreateStrategyDto } from '../dto/create-strategy.dto';
import { UpdateStrategyDto } from '../dto/update-strategy.dto';
import { IBaseRepository } from '../../common/interfaces/repository.interface';

export interface IStrategyRepository extends IBaseRepository<Strategy, CreateStrategyDto, UpdateStrategyDto> {
  findAllWithRelations(): Promise<Strategy[]>;
  findByIdWithRelations(id: number): Promise<Strategy | null>;
  findByStatus(status: string): Promise<Strategy[]>;
  countTradesByStrategy(strategyId: number): Promise<number>;
}