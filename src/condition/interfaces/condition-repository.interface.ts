import { Condition } from '../entities/condition.entity';
import { CreateConditionDto } from '../dto/create-condition.dto';
import { UpdateConditionDto } from '../dto/update-condition.dto';
import { IBaseRepository } from '../../common/interfaces/repository.interface';

export interface IConditionRepository extends IBaseRepository<Condition, CreateConditionDto, UpdateConditionDto> {
  findByName(name: string): Promise<Condition[]>;
  findByConfirmationId(confirmationId: number): Promise<Condition[]>;
  findByDescription(description: string): Promise<Condition[]>;
  findConditionsWithConfirmation(): Promise<Condition[]>;
}