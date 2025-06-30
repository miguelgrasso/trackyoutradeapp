import { Confirmation } from '../entities/confirmation.entity';
import { CreateConfirmationDto } from '../dto/create-confirmation.dto';
import { UpdateConfirmationDto } from '../dto/update-confirmation.dto';
import { IBaseRepository } from '../../common/interfaces/repository.interface';
import { Condition } from '../../condition/entities/condition.entity';

export interface IConfirmationRepository extends IBaseRepository<Confirmation, CreateConfirmationDto, UpdateConfirmationDto> {
  findByName(name: string): Promise<Confirmation | null>;
  findByDescription(description: string): Promise<Confirmation[]>;
  findConditions(confirmationId: number): Promise<Condition[]>;
  findConfirmationsWithConditions(): Promise<Confirmation[]>;
}