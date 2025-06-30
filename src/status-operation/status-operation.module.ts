import { Module } from '@nestjs/common';
import { StatusOperationService } from './status-operation.service';
import { StatusOperationController } from './status-operation.controller';
import { PrismaService } from 'src/config/prisma.service';
import { StatusOperationRepository } from './repositories/status-operation.repository';
import { StatusOperationValidator } from './validators/status-operation.validator';
import { ValidationService } from '../common/services/validation.service';
import { IValidator } from '../common/interfaces/validator.interface';
import { CreateStatusOperationDto } from './dto/create-status-operation.dto';

@Module({
  controllers: [StatusOperationController],
  providers: [
    StatusOperationService,
    PrismaService,
    ValidationService,
    {
      provide: 'IStatusOperationRepository',
      useClass: StatusOperationRepository,
    },
    {
      provide: 'STATUS_OPERATION_VALIDATORS',
      useFactory: (
        statusOperationValidator: StatusOperationValidator,
      ): IValidator<CreateStatusOperationDto>[] => [
        statusOperationValidator,
      ],
      inject: [StatusOperationValidator],
    },
    StatusOperationValidator,
  ],
  exports: [StatusOperationService, 'IStatusOperationRepository'],
})
export class StatusOperationModule {}
