import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IStatusOperationRepository } from './interfaces/status-operation-repository.interface';
import { IValidator } from '../common/interfaces/validator.interface';
import { ValidationService } from '../common/services/validation.service';
import { CreateStatusOperationDto } from './dto/create-status-operation.dto';
import { UpdateStatusOperationDto } from './dto/update-status-operation.dto';
import { StatusOperation } from './entities/status-operation.entity';

@Injectable()
export class StatusOperationService {
  constructor(
    @Inject('IStatusOperationRepository')
    private readonly statusOperationRepository: IStatusOperationRepository,
    private readonly validationService: ValidationService,
    @Inject('STATUS_OPERATION_VALIDATORS')
    private readonly validators: IValidator<CreateStatusOperationDto>[]
  ) {}

  async create(createStatusOperationDto: CreateStatusOperationDto): Promise<StatusOperation> {
    try {
      await this.validationService.validateWithValidators(createStatusOperationDto, this.validators);
      return await this.statusOperationRepository.create(createStatusOperationDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<StatusOperation[]> {
    try {
      return await this.statusOperationRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<StatusOperation> {
    try {
      const statusOperation = await this.statusOperationRepository.findById(id);
      if (!statusOperation) {
        throw new NotFoundException(`Status Operation with ID ${id} not found`);
      }
      return statusOperation;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateStatusOperationDto: UpdateStatusOperationDto): Promise<StatusOperation> {
    try {
      await this.findOne(id);
      return await this.statusOperationRepository.update(id, updateStatusOperationDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.statusOperationRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findByStatus(status: string): Promise<StatusOperation | null> {
    try {
      return await this.statusOperationRepository.findByStatus(status);
    } catch (error) {
      throw error;
    }
  }

  async findByLabel(label: string): Promise<StatusOperation[]> {
    try {
      return await this.statusOperationRepository.findByLabel(label);
    } catch (error) {
      throw error;
    }
  }

  async findActiveStatuses(): Promise<StatusOperation[]> {
    try {
      return await this.statusOperationRepository.findActiveStatuses();
    } catch (error) {
      throw error;
    }
  }
}
