import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ITradeRepository } from './interfaces/trade-repository.interface';
import { IValidator } from '../common/interfaces/validator.interface';
import { ValidationService } from '../common/services/validation.service';
import { CustomLoggerService } from '../common/logging/custom-logger.service';
import { LogPerformance } from '../common/decorators/log-performance.decorator';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';

@Injectable()
export class TradeService {
  constructor(
    @Inject('ITradeRepository')
    private readonly tradeRepository: ITradeRepository,
    private readonly validationService: ValidationService,
    private readonly customLogger: CustomLoggerService,
    @Inject('TRADE_VALIDATORS')
    private readonly validators: IValidator<CreateTradeDto>[]
  ) {}

  @LogPerformance('TradeService')
  async create(createTradeDto: CreateTradeDto): Promise<Trade> {
    try {
      this.customLogger.log(
        `Creating trade: Symbol=${createTradeDto.symbolId}, Quantity=${createTradeDto.quantity}`,
        'TradeService'
      );
      
      // Apply all validators using Strategy Pattern
      await this.validationService.validateWithValidators(createTradeDto, this.validators);
      
      const trade = await this.tradeRepository.create(createTradeDto);
      
      this.customLogger.logTradeCreated(
        trade.id,
        `Symbol-${trade.symbolId}`,
        trade.quantity,
        'TradeService'
      );
      
      return trade;
    } catch (error) {
      this.customLogger.error(
        `Failed to create trade: ${error.message}`,
        error.stack,
        'TradeService'
      );
      throw error;
    }
  }

  @LogPerformance('TradeService')
  async findAll(): Promise<Trade[]> {
    try {
      this.customLogger.logRepositoryOperation('findAll', 'Trade', undefined, 'TradeService');
      return await this.tradeRepository.findAllWithRelations();
    } catch (error) {
      this.customLogger.error(
        `Failed to find all trades: ${error.message}`,
        error.stack,
        'TradeService'
      );
      throw error;
    }
  }

  @LogPerformance('TradeService')
  async findOne(id: number): Promise<Trade> {
    try {
      this.customLogger.logRepositoryOperation('findOne', 'Trade', id, 'TradeService');
      
      const trade = await this.tradeRepository.findByIdWithRelations(id);
      
      if (!trade) {
        this.customLogger.warn(`Trade with ID ${id} not found`, 'TradeService');
        throw new NotFoundException(`Trade with ID ${id} not found`);
      }

      return trade;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.customLogger.error(
          `Failed to find trade ${id}: ${error.message}`,
          error.stack,
          'TradeService'
        );
      }
      throw error;
    }
  }

  @LogPerformance('TradeService')
  async update(id: number, updateTradeDto: UpdateTradeDto): Promise<Trade> {
    try {
      this.customLogger.log(`Updating trade ${id}`, 'TradeService');
      
      // Check if trade exists
      await this.findOne(id);
      
      // Apply validators if we're updating validation-relevant fields
      if (this.shouldValidateUpdate(updateTradeDto)) {
        const mergedDto = { ...updateTradeDto } as CreateTradeDto;
        await this.validationService.validateWithValidators(mergedDto, this.validators);
      }

      const updatedTrade = await this.tradeRepository.update(id, updateTradeDto);
      
      this.customLogger.log(`Successfully updated trade ${id}`, 'TradeService');
      
      return updatedTrade;
    } catch (error) {
      this.customLogger.error(
        `Failed to update trade ${id}: ${error.message}`,
        error.stack,
        'TradeService'
      );
      throw error;
    }
  }

  @LogPerformance('TradeService')
  async remove(id: number): Promise<void> {
    try {
      this.customLogger.log(`Removing trade ${id}`, 'TradeService');
      
      // Check if trade exists
      await this.findOne(id);
      
      await this.tradeRepository.delete(id);
      
      this.customLogger.log(`Successfully removed trade ${id}`, 'TradeService');
    } catch (error) {
      this.customLogger.error(
        `Failed to remove trade ${id}: ${error.message}`,
        error.stack,
        'TradeService'
      );
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