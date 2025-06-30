import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { IStrategyRepository } from './interfaces/strategy-repository.interface';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';
import { Strategy } from './entities/strategy.entity';

@Injectable()
export class StrategyService {
  constructor(
    @Inject('IStrategyRepository')
    private readonly strategyRepository: IStrategyRepository
  ) {}

  async create(createStrategyDto: CreateStrategyDto): Promise<Strategy> {
    try {
      return await this.strategyRepository.create(createStrategyDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Strategy[]> {
    try {
      return await this.strategyRepository.findAllWithRelations();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Strategy> {
    try {
      const strategy = await this.strategyRepository.findByIdWithRelations(id);

      if (!strategy) {
        throw new NotFoundException(`Strategy with ID ${id} not found`);
      }

      return strategy;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateStrategyDto: UpdateStrategyDto): Promise<Strategy> {
    try {
      // Check if strategy exists
      await this.findOne(id);
      
      return await this.strategyRepository.update(id, updateStrategyDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Check if strategy exists
      await this.findOne(id);
      
      // Check if strategy has trades
      const tradesCount = await this.strategyRepository.countTradesByStrategy(id);
      
      if (tradesCount > 0) {
        throw new BadRequestException(`Cannot delete strategy with ${tradesCount} associated trades`);
      }
      
      await this.strategyRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  // Additional methods that leverage repository capabilities
  async findByStatus(status: string): Promise<Strategy[]> {
    try {
      return await this.strategyRepository.findByStatus(status);
    } catch (error) {
      throw error;
    }
  }

  async getTradesCount(strategyId: number): Promise<number> {
    try {
      return await this.strategyRepository.countTradesByStrategy(strategyId);
    } catch (error) {
      throw error;
    }
  }
} 