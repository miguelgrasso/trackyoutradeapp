import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { PrismaService } from 'src/config/prisma.service';
import { ResultRepository } from './repositories/result.repository';
import { ResultValidator } from './validators/result.validator';
import { ValidationService } from '../common/services/validation.service';
import { IValidator } from '../common/interfaces/validator.interface';
import { CreateResultDto } from './dto/create-result.dto';

@Module({
  controllers: [ResultController],
  providers: [
    ResultService,
    PrismaService,
    ValidationService,
    {
      provide: 'IResultRepository',
      useClass: ResultRepository,
    },
    {
      provide: 'RESULT_VALIDATORS',
      useFactory: (
        resultValidator: ResultValidator,
      ): IValidator<CreateResultDto>[] => [
        resultValidator,
      ],
      inject: [ResultValidator],
    },
    ResultValidator,
  ],
  exports: [ResultService, 'IResultRepository'],
})
export class ResultModule {}
