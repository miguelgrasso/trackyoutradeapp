import { Result } from '../entities/result.entity';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { IBaseRepository } from '../../common/interfaces/repository.interface';

export interface IResultRepository extends IBaseRepository<Result, CreateResultDto, UpdateResultDto> {
  findByResult(result: string): Promise<Result | null>;
  findByLabel(label: string): Promise<Result[]>;
}