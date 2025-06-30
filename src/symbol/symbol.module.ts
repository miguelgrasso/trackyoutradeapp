import { Module } from '@nestjs/common';
import { SymbolService } from './symbol.service';
import { SymbolController } from './symbol.controller';
import { PrismaService } from 'src/config/prisma.service';
import { SymbolRepository } from './repositories/symbol.repository';
import { SymbolValidator } from './validators/symbol.validator';
import { ValidationService } from '../common/services/validation.service';
import { IValidator } from '../common/interfaces/validator.interface';
import { CreateSymbolDto } from './dto/create-symbol.dto';

@Module({
  controllers: [SymbolController],
  providers: [
    SymbolService,
    PrismaService,
    ValidationService,
    {
      provide: 'ISymbolRepository',
      useClass: SymbolRepository,
    },
    {
      provide: 'SYMBOL_VALIDATORS',
      useFactory: (
        symbolValidator: SymbolValidator,
      ): IValidator<CreateSymbolDto>[] => [
        symbolValidator,
      ],
      inject: [SymbolValidator],
    },
    SymbolValidator,
  ],
  exports: [SymbolService, 'ISymbolRepository'],
})
export class SymbolModule {}