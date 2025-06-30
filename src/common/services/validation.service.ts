import { Injectable } from '@nestjs/common';
import { IValidator } from '../interfaces/validator.interface';

@Injectable()
export class ValidationService {
  async validateWithValidators<T>(data: T, validators: IValidator<T>[]): Promise<void> {
    const validationPromises = validators.map(validator => validator.validate(data));
    await Promise.all(validationPromises);
  }
}