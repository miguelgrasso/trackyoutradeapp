import { StatusOperation } from '../entities/status-operation.entity';
import { CreateStatusOperationDto } from '../dto/create-status-operation.dto';
import { UpdateStatusOperationDto } from '../dto/update-status-operation.dto';
import { IBaseRepository } from '../../common/interfaces/repository.interface';

export interface IStatusOperationRepository extends IBaseRepository<StatusOperation, CreateStatusOperationDto, UpdateStatusOperationDto> {
  findByStatus(status: string): Promise<StatusOperation | null>;
  findByLabel(label: string): Promise<StatusOperation[]>;
  findActiveStatuses(): Promise<StatusOperation[]>;
}