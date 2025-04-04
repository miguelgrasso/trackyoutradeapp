import { Module } from '@nestjs/common';
import { ConfirmationService } from './confirmation.service';
import { ConfirmationController } from './confirmation.controller';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [ConfirmationController],
  providers: [ConfirmationService,PrismaService],
})
export class ConfirmationModule {}
