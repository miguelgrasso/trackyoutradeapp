import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperationTypeService } from './operation-type.service';
import { CreateOperationTypeDto } from './dto/create-operation-type.dto';
import { UpdateOperationTypeDto } from './dto/update-operation-type.dto';

@Controller('operation-type')
export class OperationTypeController {
  constructor(private readonly operationTypeService: OperationTypeService) {}

  @Post()
  create(@Body() createOperationTypeDto: CreateOperationTypeDto) {
    return this.operationTypeService.create(createOperationTypeDto);
  }

  @Get()
  findAll() {
    return this.operationTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperationTypeDto: UpdateOperationTypeDto) {
    return this.operationTypeService.update(+id, updateOperationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationTypeService.remove(+id);
  }
}
