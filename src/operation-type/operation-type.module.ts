import { Module } from '@nestjs/common';
import { OperationTypeService } from './operation-type.service';
import { OperationTypeController } from './operation-type.controller';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [OperationTypeController],
  providers: [OperationTypeService,PrismaService],
})
export class OperationTypeModule {}
