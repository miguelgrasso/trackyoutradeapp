import { PartialType } from '@nestjs/mapped-types';
import { CreateOperationTypeDto } from './create-operation-type.dto';

export class UpdateOperationTypeDto extends PartialType(CreateOperationTypeDto) {
    label: string;
    operation: string;
}
