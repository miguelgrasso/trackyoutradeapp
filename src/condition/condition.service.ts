import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IConditionRepository } from './interfaces/condition-repository.interface';
import { IValidator } from '../common/interfaces/validator.interface';
import { ValidationService } from '../common/services/validation.service';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { Condition } from './entities/condition.entity';

@Injectable()
export class ConditionService {
  constructor(
    @Inject('IConditionRepository')
    private readonly conditionRepository: IConditionRepository,
    private readonly validationService: ValidationService,
    @Inject('CONDITION_VALIDATORS')
    private readonly validators: IValidator<CreateConditionDto>[]
  ) {}

  async create(createConditionDto: CreateConditionDto): Promise<Condition> {
    try {
      await this.validationService.validateWithValidators(createConditionDto, this.validators);
      return await this.conditionRepository.create(createConditionDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Condition[]> {
    try {
      return await this.conditionRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Condition> {
    try {
      const condition = await this.conditionRepository.findById(id);
      if (!condition) {
        throw new NotFoundException(`Condition with ID ${id} not found`);
      }
      return condition;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateConditionDto: UpdateConditionDto): Promise<Condition> {
    try {
      await this.findOne(id);
      return await this.conditionRepository.update(id, updateConditionDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.conditionRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<Condition[]> {
    try {
      return await this.conditionRepository.findByName(name);
    } catch (error) {
      throw error;
    }
  }

  async findByConfirmationId(confirmationId: number): Promise<Condition[]> {
    try {
      return await this.conditionRepository.findByConfirmationId(confirmationId);
    } catch (error) {
      throw error;
    }
  }

  async findByDescription(description: string): Promise<Condition[]> {
    try {
      return await this.conditionRepository.findByDescription(description);
    } catch (error) {
      throw error;
    }
  }

  async findConditionsWithConfirmation(): Promise<Condition[]> {
    try {
      return await this.conditionRepository.findConditionsWithConfirmation();
    } catch (error) {
      throw error;
    }
  }
}

