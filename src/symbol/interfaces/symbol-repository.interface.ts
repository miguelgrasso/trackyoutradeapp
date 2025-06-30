import { Symbol } from '../entities/symbol.entity';
import { CreateSymbolDto } from '../dto/create-symbol.dto';
import { UpdateSymbolDto } from '../dto/update-symbol.dto';
import { IBaseRepository } from '../../common/interfaces/repository.interface';

export interface ISymbolRepository extends IBaseRepository<Symbol, CreateSymbolDto, UpdateSymbolDto> {
  findByCodeSymbol(codeSymbol: string): Promise<Symbol | null>;
  findByLabel(label: string): Promise<Symbol[]>;
  findActiveSymbols(): Promise<Symbol[]>;
}