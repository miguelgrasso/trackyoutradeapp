import { Module } from '@nestjs/common';
import { StatusOperationService } from './status-operation.service';
import { StatusOperationController } from './status-operation.controller';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [StatusOperationController],
  providers: [StatusOperationService,PrismaService],
})
export class StatusOperationModule {}
