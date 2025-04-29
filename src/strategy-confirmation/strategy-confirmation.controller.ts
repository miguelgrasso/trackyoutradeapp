import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { StrategyConfirmationService } from './strategy-confirmation.service';
import { CreateStrategyConfirmationDto } from './dto/create-strategy-confirmation.dto';
import { UpdateStrategyConfirmationDto } from './dto/update-strategy-confirmation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Relaciones Strategy-Confirmation')
@Controller('strategy-confirmation')
export class StrategyConfirmationController {
  constructor(private readonly strategyConfirmationService: StrategyConfirmationService) {}

  @Post()
  @ApiOperation({ summary: 'Asociar una estrategia con una confirmación' })
  @ApiResponse({ status: 201, description: 'La relación ha sido creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados.' })
  @ApiBody({ type: CreateStrategyConfirmationDto })
  create(@Body() createStrategyConfirmationDto: CreateStrategyConfirmationDto) {
    return this.strategyConfirmationService.create(createStrategyConfirmationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las relaciones' })
  @ApiResponse({ status: 200, description: 'Lista de relaciones recuperada exitosamente.' })
  findAll() {
    return this.strategyConfirmationService.findAll();
  }

  @Get('strategy/:id/confirmations')
  @ApiOperation({ summary: 'Obtener todas las confirmaciones asociadas a una estrategia' })
  @ApiParam({ name: 'id', description: 'ID de la estrategia' })
  @ApiResponse({ status: 200, description: 'Lista de confirmaciones recuperada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Estrategia no encontrada.' })
  async findConfirmationsByStrategy(@Param('id') id: string) {
    console.log("id", id);
    const result = await this.strategyConfirmationService.findConfirmationsByStrategy(+id);
    //console.log("this.strategyConfirmationService", result);*/
    return result;
  }

  @Get('confirmation/:id/strategies')
  @ApiOperation({ summary: 'Obtener todas las estrategias asociadas a una confirmación' })
  @ApiParam({ name: 'id', description: 'ID de la confirmación' })
  @ApiResponse({ status: 200, description: 'Lista de estrategias recuperada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Confirmación no encontrada.' })
  findStrategiesByConfirmation(@Param('id') id: string) {
    return this.strategyConfirmationService.findStrategiesByConfirmation(+id);
  }

  @Patch('status')
  @ApiOperation({ summary: 'Actualizar el estado de una relación entre estrategia y confirmación' })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        strategyId: { type: 'number', example: 1 },
        confirmationId: { type: 'number', example: 2 },
        status: { type: 'string', example: 'inactive', enum: ['active', 'inactive'] }
      },
      required: ['strategyId', 'confirmationId', 'status']
    }
  })
  @ApiResponse({ status: 200, description: 'Estado de la relación actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  updateStatus(@Body() body: { strategyId: number; confirmationId: number; status: string }) {
    return this.strategyConfirmationService.updateStatus(body.strategyId, body.confirmationId, body.status);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una relación entre estrategia y confirmación' })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        strategyId: { type: 'number', example: 1 },
        confirmationId: { type: 'number', example: 2 }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Relación eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  remove(@Body() body: { strategyId: number; confirmationId: number }) {
    return this.strategyConfirmationService.remove(body.strategyId, body.confirmationId);
  }
}
