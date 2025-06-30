import { Module } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { ConditionController } from './condition.controller';
import { PrismaService } from 'src/config/prisma.service';
import { ConditionRepository } from './repositories/condition.repository';
import { ConditionValidator } from './validators/condition.validator';
import { ValidationService } from '../common/services/validation.service';
import { IValidator } from '../common/interfaces/validator.interface';
import { CreateConditionDto } from './dto/create-condition.dto';

@Module({
  controllers: [ConditionController],
  providers: [
    ConditionService,
    PrismaService,
    ValidationService,
    {
      provide: 'IConditionRepository',
      useClass: ConditionRepository,
    },
    {
      provide: 'CONDITION_VALIDATORS',
      useFactory: (
        conditionValidator: ConditionValidator,
      ): IValidator<CreateConditionDto>[] => [
        conditionValidator,
      ],
      inject: [ConditionValidator],
    },
    ConditionValidator,
  ],
  exports: [ConditionService, 'IConditionRepository'],
})
export class ConditionModule {}
