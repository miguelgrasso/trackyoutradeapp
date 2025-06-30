import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IConfirmationRepository } from './interfaces/confirmation-repository.interface';
import { IValidator } from '../common/interfaces/validator.interface';
import { ValidationService } from '../common/services/validation.service';
import { CreateConfirmationDto } from './dto/create-confirmation.dto';
import { UpdateConfirmationDto } from './dto/update-confirmation.dto';
import { Confirmation } from './entities/confirmation.entity';
import { Condition } from '../condition/entities/condition.entity';

@Injectable()
export class ConfirmationService {
  constructor(
    @Inject('IConfirmationRepository')
    private readonly confirmationRepository: IConfirmationRepository,
    private readonly validationService: ValidationService,
    @Inject('CONFIRMATION_VALIDATORS')
    private readonly validators: IValidator<CreateConfirmationDto>[]
  ) {}

  async create(createConfirmationDto: CreateConfirmationDto): Promise<Confirmation> {
    try {
      await this.validationService.validateWithValidators(createConfirmationDto, this.validators);
      return await this.confirmationRepository.create(createConfirmationDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Confirmation[]> {
    try {
      return await this.confirmationRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Confirmation> {
    try {
      const confirmation = await this.confirmationRepository.findById(id);
      if (!confirmation) {
        throw new NotFoundException(`Confirmation with ID ${id} not found`);
      }
      return confirmation;
    } catch (error) {
      throw error;
    }
  }

  async findConditions(id: number): Promise<Condition[]> {
    try {
      await this.findOne(id); // Ensure confirmation exists
      return await this.confirmationRepository.findConditions(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateConfirmationDto: UpdateConfirmationDto): Promise<Confirmation> {
    try {
      await this.findOne(id);
      return await this.confirmationRepository.update(id, updateConfirmationDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.confirmationRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<Confirmation | null> {
    try {
      return await this.confirmationRepository.findByName(name);
    } catch (error) {
      throw error;
    }
  }

  async findByDescription(description: string): Promise<Confirmation[]> {
    try {
      return await this.confirmationRepository.findByDescription(description);
    } catch (error) {
      throw error;
    }
  }

  async findConfirmationsWithConditions(): Promise<Confirmation[]> {
    try {
      return await this.confirmationRepository.findConfirmationsWithConditions();
    } catch (error) {
      throw error;
    }
  }
}
