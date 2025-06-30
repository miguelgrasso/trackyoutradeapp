export interface IBaseRepository<T, CreateDto, UpdateDto> {
  create(data: CreateDto): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  update(id: number, data: UpdateDto): Promise<T>;
  delete(id: number): Promise<void>;
}