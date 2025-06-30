import { Module } from '@nestjs/common';
import { OperationTypeService } from './operation-type.service';
import { OperationTypeController } from './operation-type.controller';
import { PrismaService } from 'src/config/prisma.service';
import { OperationTypeRepository } from './repositories/operation-type.repository';
import { OperationTypeValidator } from './validators/operation-type.validator';
import { ValidationService } from '../common/services/validation.service';
import { IValidator } from '../common/interfaces/validator.interface';
import { CreateOperationTypeDto } from './dto/create-operation-type.dto';

@Module({
  controllers: [OperationTypeController],
  providers: [
    OperationTypeService,
    PrismaService,
    ValidationService,
    {
      provide: 'IOperationTypeRepository',
      useClass: OperationTypeRepository,
    },
    {
      provide: 'OPERATION_TYPE_VALIDATORS',
      useFactory: (
        operationTypeValidator: OperationTypeValidator,
      ): IValidator<CreateOperationTypeDto>[] => [
        operationTypeValidator,
      ],
      inject: [OperationTypeValidator],
    },
    OperationTypeValidator,
  ],
  exports: [OperationTypeService, 'IOperationTypeRepository'],
})
export class OperationTypeModule {}
