import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Condition')
@Controller('condition')
export class ConditionController {
  constructor(private readonly conditionService: ConditionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new condition' })
  @ApiResponse({ status: 201, description: 'The condition has been successfully created.' })
  create(@Body() createConditionDto: CreateConditionDto) {
    return this.conditionService.create(createConditionDto);
    
  }

  @Get()
  @ApiOperation({ summary: 'Get all conditions' })
  @ApiResponse({ status: 200, description: 'The conditions have been successfully retrieved.' })
  findAll() {
    return this.conditionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a condition by id' })
  @ApiResponse({ status: 200, description: 'The condition has been successfully retrieved.' })
  findOne(@Param('id') id: string) {
    return this.conditionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a condition by id' })
  @ApiResponse({ status: 200, description: 'The condition has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateConditionDto: UpdateConditionDto) {
    return this.conditionService.update(+id, updateConditionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a condition by id' })
  @ApiResponse({ status: 200, description: 'The condition has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.conditionService.remove(+id);
  }
}
