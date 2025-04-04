import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusOperationService } from './status-operation.service';
import { CreateStatusOperationDto } from './dto/create-status-operation.dto';
import { UpdateStatusOperationDto } from './dto/update-status-operation.dto';

@Controller('status-operation')
export class StatusOperationController {
  constructor(private readonly statusOperationService: StatusOperationService) {}

  @Post()
  create(@Body() createStatusOperationDto: CreateStatusOperationDto) {
    return this.statusOperationService.create(createStatusOperationDto);
  }

  @Get()
  findAll() {
    return this.statusOperationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusOperationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusOperationDto: UpdateStatusOperationDto) {
    return this.statusOperationService.update(+id, updateStatusOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusOperationService.remove(+id);
  }
}
