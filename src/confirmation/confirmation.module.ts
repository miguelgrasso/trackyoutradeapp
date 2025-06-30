import { Module } from '@nestjs/common';
import { ConfirmationService } from './confirmation.service';
import { ConfirmationController } from './confirmation.controller';
import { PrismaService } from 'src/config/prisma.service';
import { ConfirmationRepository } from './repositories/confirmation.repository';
import { ConfirmationValidator } from './validators/confirmation.validator';
import { ValidationService } from '../common/services/validation.service';
import { IValidator } from '../common/interfaces/validator.interface';
import { CreateConfirmationDto } from './dto/create-confirmation.dto';

@Module({
  controllers: [ConfirmationController],
  providers: [
    ConfirmationService,
    PrismaService,
    ValidationService,
    {
      provide: 'IConfirmationRepository',
      useClass: ConfirmationRepository,
    },
    {
      provide: 'CONFIRMATION_VALIDATORS',
      useFactory: (
        confirmationValidator: ConfirmationValidator,
      ): IValidator<CreateConfirmationDto>[] => [
        confirmationValidator,
      ],
      inject: [ConfirmationValidator],
    },
    ConfirmationValidator,
  ],
  exports: [ConfirmationService, 'IConfirmationRepository'],
})
export class ConfirmationModule {}
