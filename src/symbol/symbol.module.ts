import { Module } from '@nestjs/common';
import { SymbolService } from './symbol.service';
import { SymbolController } from './symbol.controller';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [SymbolController],
  providers: [SymbolService,PrismaService],
})
export class SymbolModule {}
