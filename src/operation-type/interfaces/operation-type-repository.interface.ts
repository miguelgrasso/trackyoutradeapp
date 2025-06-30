import { OperationType } from '../entities/operation-type.entity';
import { CreateOperationTypeDto } from '../dto/create-operation-type.dto';
import { UpdateOperationTypeDto } from '../dto/update-operation-type.dto';
import { IBaseRepository } from '../../common/interfaces/repository.interface';

export interface IOperationTypeRepository extends IBaseRepository<OperationType, CreateOperationTypeDto, UpdateOperationTypeDto> {
  findByOperation(operation: string): Promise<OperationType | null>;
  findByLabel(label: string): Promise<OperationType[]>;
  findActiveOperationTypes(): Promise<OperationType[]>;
}