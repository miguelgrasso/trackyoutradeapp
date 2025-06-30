export interface IValidator<T> {
  validate(data: T): Promise<void>;
}

export interface IValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface IAsyncValidator<T> {
  validateAsync(data: T): Promise<IValidationResult>;
}