import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusOperationDto } from './create-status-operation.dto';

export class UpdateStatusOperationDto extends PartialType(CreateStatusOperationDto) {
    label: string;
    status: string;
}
