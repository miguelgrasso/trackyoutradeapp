import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfirmationService } from './confirmation.service';
import { CreateConfirmationDto } from './dto/create-confirmation.dto';
import { UpdateConfirmationDto } from './dto/update-confirmation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Confirmations')
@Controller('confirmation')
export class ConfirmationController {
  constructor(private readonly confirmationService: ConfirmationService) {}

  @ApiOperation({ summary: 'Create a new confirmation' })
  @ApiResponse({ status: 201, description: 'The confirmation has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createConfirmationDto: CreateConfirmationDto) {
    return this.confirmationService.create(createConfirmationDto);
  }

  @ApiOperation({ summary: 'Get all confirmations' })
  @ApiResponse({ status: 200, description: 'Return all confirmations.' })
  @Get()
  findAll() {
    return this.confirmationService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific confirmation by id' })
  @ApiParam({ name: 'id', description: 'Confirmation ID' })
  @ApiResponse({ status: 200, description: 'Return the confirmation.' })
  @ApiResponse({ status: 404, description: 'Confirmation not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.confirmationService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a confirmation' })
  @ApiParam({ name: 'id', description: 'Confirmation ID' })
  @ApiResponse({ status: 200, description: 'The confirmation has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Confirmation not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfirmationDto: UpdateConfirmationDto) {
    return this.confirmationService.update(+id, updateConfirmationDto);
  }

  @ApiOperation({ summary: 'Delete a confirmation' })
  @ApiParam({ name: 'id', description: 'Confirmation ID' })
  @ApiResponse({ status: 200, description: 'The confirmation has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Confirmation not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.confirmationService.remove(+id);
  }
}
