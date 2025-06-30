import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IResultRepository } from './interfaces/result-repository.interface';
import { IValidator } from '../common/interfaces/validator.interface';
import { ValidationService } from '../common/services/validation.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultService {
  constructor(
    @Inject('IResultRepository')
    private readonly resultRepository: IResultRepository,
    private readonly validationService: ValidationService,
    @Inject('RESULT_VALIDATORS')
    private readonly validators: IValidator<CreateResultDto>[]
  ) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    try {
      await this.validationService.validateWithValidators(createResultDto, this.validators);
      return await this.resultRepository.create(createResultDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Result[]> {
    try {
      return await this.resultRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Result> {
    try {
      const result = await this.resultRepository.findById(id);
      if (!result) {
        throw new NotFoundException(`Result with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateResultDto: UpdateResultDto): Promise<Result> {
    try {
      await this.findOne(id);
      return await this.resultRepository.update(id, updateResultDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.resultRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findByResult(result: string): Promise<Result | null> {
    try {
      return await this.resultRepository.findByResult(result);
    } catch (error) {
      throw error;
    }
  }

  async findByLabel(label: string): Promise<Result[]> {
    try {
      return await this.resultRepository.findByLabel(label);
    } catch (error) {
      throw error;
    }
  }
}
