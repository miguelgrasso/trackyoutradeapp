import { Symbol } from '../../symbol/entities/symbol.entity';
import { OperationType } from '../../operation-type/entities/operation-type.entity';
import { Result } from '../../result/entities/result.entity';
import { StatusOperation } from '../../status-operation/entities/status-operation.entity';

export class Trade {
    id: number;
    symbolId: number; // Foreign key to Symbol
    symbol: Symbol; // Relation to Symbol entity
    operationTypeId: number; // Foreign key to OperationType
    operationType: OperationType; // Relation to OperationType entity
    resultId: number; // Foreign key to Result
    result: Result; // Relation to Result entity
    statusOperationId: number; // Foreign key to StatusOperation
    statusOperation: StatusOperation; // Relation to StatusOperation entity
    quantity: number;
    dateEntry: Date;
    priceEntry: number;
    priceExit: number;
    spread: number;
}