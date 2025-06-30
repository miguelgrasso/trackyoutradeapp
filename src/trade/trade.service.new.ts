import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ITradeRepository } from './interfaces/trade-repository.interface';
import { IValidator } from '../common/interfaces/validator.interface';
import { ValidationService } from '../common/services/validation.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';

@Injectable()
export class TradeService {
  constructor(
    @Inject('ITradeRepository')
    private readonly tradeRepository: ITradeRepository,
    private readonly validationService: ValidationService,
    @Inject('TRADE_VALIDATORS')
    private readonly validators: IValidator<CreateTradeDto>[]
  ) {}

  async create(createTradeDto: CreateTradeDto): Promise<Trade> {
    try {
      // Apply all validators using Strategy Pattern
      await this.validationService.validateWithValidators(createTradeDto, this.validators);
      
      return await this.tradeRepository.create(createTradeDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Trade[]> {
    try {
      return await this.tradeRepository.findAllWithRelations();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Trade> {
    try {
      const trade = await this.tradeRepository.findByIdWithRelations(id);
      
      if (!trade) {
        throw new NotFoundException(`Trade with ID ${id} not found`);
      }

      return trade;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateTradeDto: UpdateTradeDto): Promise<Trade> {
    try {
      // Check if trade exists
      await this.findOne(id);
      
      // Apply validators if we're updating validation-relevant fields
      if (this.shouldValidateUpdate(updateTradeDto)) {
        const mergedDto = { ...updateTradeDto } as CreateTradeDto;
        await this.validationService.validateWithValidators(mergedDto, this.validators);
      }

      return await this.tradeRepository.update(id, updateTradeDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Check if trade exists
      await this.findOne(id);
      
      await this.tradeRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  // Additional methods that leverage repository capabilities
  async findByStrategy(strategyId: number): Promise<Trade[]> {
    try {
      return await this.tradeRepository.findByStrategyId(strategyId);
    } catch (error) {
      throw error;
    }
  }

  async findBySymbol(symbolId: number): Promise<Trade[]> {
    try {
      return await this.tradeRepository.findBySymbolId(symbolId);
    } catch (error) {
      throw error;
    }
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Trade[]> {
    try {
      return await this.tradeRepository.findByDateRange(startDate, endDate);
    } catch (error) {
      throw error;
    }
  }

  private shouldValidateUpdate(updateDto: UpdateTradeDto): boolean {
    const validationRequiredFields = [
      'symbolId', 'operationTypeId', 'resultId', 'statusOperationId', 
      'strategyId', 'quantity', 'priceEntry', 'priceExit', 'spread', 'dateEntry'
    ];
    
    return validationRequiredFields.some(field => field in updateDto);
  }
}