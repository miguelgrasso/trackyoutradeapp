import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('strategies')
@Controller('strategies')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva estrategia' })
  @ApiResponse({ status: 201, description: 'La estrategia ha sido creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados.' })
  @ApiBody({ type: CreateStrategyDto })
  create(@Body() createStrategyDto: CreateStrategyDto) {
    return this.strategyService.create(createStrategyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las estrategias' })
  @ApiResponse({ status: 200, description: 'Lista de estrategias recuperada exitosamente.' })
  findAll() {
    return this.strategyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una estrategia por ID' })
  @ApiParam({ name: 'id', description: 'ID de la estrategia' })
  @ApiResponse({ status: 200, description: 'Estrategia encontrada.' })
  @ApiResponse({ status: 404, description: 'Estrategia no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.strategyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una estrategia' })
  @ApiParam({ name: 'id', description: 'ID de la estrategia' })
  @ApiResponse({ status: 200, description: 'Estrategia actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Estrategia no encontrada.' })
  @ApiBody({ type: UpdateStrategyDto })
  update(@Param('id') id: string, @Body() updateStrategyDto: UpdateStrategyDto) {
    return this.strategyService.update(+id, updateStrategyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una estrategia' })
  @ApiParam({ name: 'id', description: 'ID de la estrategia' })
  @ApiResponse({ status: 200, description: 'Estrategia eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Estrategia no encontrada.' })
  remove(@Param('id') id: string) {
    return this.strategyService.remove(+id);
  }
} 