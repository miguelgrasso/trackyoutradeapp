import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IOperationTypeRepository } from './interfaces/operation-type-repository.interface';
import { IValidator } from '../common/interfaces/validator.interface';
import { ValidationService } from '../common/services/validation.service';
import { CreateOperationTypeDto } from './dto/create-operation-type.dto';
import { UpdateOperationTypeDto } from './dto/update-operation-type.dto';
import { OperationType } from './entities/operation-type.entity';

@Injectable()
export class OperationTypeService {
  constructor(
    @Inject('IOperationTypeRepository')
    private readonly operationTypeRepository: IOperationTypeRepository,
    private readonly validationService: ValidationService,
    @Inject('OPERATION_TYPE_VALIDATORS')
    private readonly validators: IValidator<CreateOperationTypeDto>[]
  ) {}

  async create(createOperationTypeDto: CreateOperationTypeDto): Promise<OperationType> {
    try {
      await this.validationService.validateWithValidators(createOperationTypeDto, this.validators);
      return await this.operationTypeRepository.create(createOperationTypeDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<OperationType[]> {
    try {
      return await this.operationTypeRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<OperationType> {
    try {
      const operationType = await this.operationTypeRepository.findById(id);
      if (!operationType) {
        throw new NotFoundException(`Operation Type with ID ${id} not found`);
      }
      return operationType;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateOperationTypeDto: UpdateOperationTypeDto): Promise<OperationType> {
    try {
      await this.findOne(id);
      return await this.operationTypeRepository.update(id, updateOperationTypeDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.operationTypeRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findByOperation(operation: string): Promise<OperationType | null> {
    try {
      return await this.operationTypeRepository.findByOperation(operation);
    } catch (error) {
      throw error;
    }
  }

  async findByLabel(label: string): Promise<OperationType[]> {
    try {
      return await this.operationTypeRepository.findByLabel(label);
    } catch (error) {
      throw error;
    }
  }

  async findActiveOperationTypes(): Promise<OperationType[]> {
    try {
      return await this.operationTypeRepository.findActiveOperationTypes();
    } catch (error) {
      throw error;
    }
  }
}
