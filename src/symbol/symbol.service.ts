import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ISymbolRepository } from './interfaces/symbol-repository.interface';
import { IValidator } from '../common/interfaces/validator.interface';
import { ValidationService } from '../common/services/validation.service';
import { CreateSymbolDto } from './dto/create-symbol.dto';
import { UpdateSymbolDto } from './dto/update-symbol.dto';
import { Symbol } from './entities/symbol.entity';

@Injectable()
export class SymbolService {
  constructor(
    @Inject('ISymbolRepository')
    private readonly symbolRepository: ISymbolRepository,
    private readonly validationService: ValidationService,
    @Inject('SYMBOL_VALIDATORS')
    private readonly validators: IValidator<CreateSymbolDto>[]
  ) {}

  async create(createSymbolDto: CreateSymbolDto): Promise<Symbol> {
    try {
      await this.validationService.validateWithValidators(createSymbolDto, this.validators);
      return await this.symbolRepository.create(createSymbolDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Symbol[]> {
    try {
      return await this.symbolRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Symbol> {
    try {
      const symbol = await this.symbolRepository.findById(id);
      if (!symbol) {
        throw new NotFoundException(`Symbol with ID ${id} not found`);
      }
      return symbol;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateSymbolDto: UpdateSymbolDto): Promise<Symbol> {
    try {
      await this.findOne(id);
      return await this.symbolRepository.update(id, updateSymbolDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.symbolRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findByCodeSymbol(codeSymbol: string): Promise<Symbol | null> {
    try {
      return await this.symbolRepository.findByCodeSymbol(codeSymbol);
    } catch (error) {
      throw error;
    }
  }

  async findByLabel(label: string): Promise<Symbol[]> {
    try {
      return await this.symbolRepository.findByLabel(label);
    } catch (error) {
      throw error;
    }
  }

  async findActiveSymbols(): Promise<Symbol[]> {
    try {
      return await this.symbolRepository.findActiveSymbols();
    } catch (error) {
      throw error;
    }
  }
}