import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradeConfirmationService } from './trade-confirmation.service';
import { CreateTradeConfirmationDto } from './dto/create-trade-confirmation.dto';
import { UpdateTradeConfirmationDto } from './dto/update-trade-confirmation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Trade Confirmations')
@Controller('trade-confirmations')
export class TradeConfirmationController {
  constructor(private readonly tradeConfirmationService: TradeConfirmationService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva confirmación para un trade' })
  @ApiResponse({ status: 201, description: 'La confirmación ha sido creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados.' })
  @ApiResponse({ status: 404, description: 'TradeDetail, Confirmation o Condition no encontrado.' })
  create(@Body() createTradeConfirmationDto: CreateTradeConfirmationDto) {
    return this.tradeConfirmationService.create(createTradeConfirmationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las confirmaciones de trades' })
  @ApiResponse({ status: 200, description: 'Lista de confirmaciones recuperada exitosamente.' })
  findAll() {
    return this.tradeConfirmationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una confirmación de trade por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la confirmación del trade' })
  @ApiResponse({ status: 200, description: 'Confirmación encontrada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Confirmación no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.tradeConfirmationService.findOne(+id);
  }

  @Get('trade-detail/:tradeDetailId')
  @ApiOperation({ summary: 'Obtener confirmaciones por el ID del detalle del trade' })
  @ApiParam({ name: 'tradeDetailId', description: 'ID del detalle del trade' })
  @ApiResponse({ status: 200, description: 'Confirmaciones encontradas exitosamente.' })
  findByTradeDetailId(@Param('tradeDetailId') tradeDetailId: string) {
    return this.tradeConfirmationService.findByTradeDetailId(+tradeDetailId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una confirmación de trade' })
  @ApiParam({ name: 'id', description: 'ID de la confirmación del trade' })
  @ApiResponse({ status: 200, description: 'Confirmación actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Confirmación no encontrada.' })
  update(@Param('id') id: string, @Body() updateTradeConfirmationDto: UpdateTradeConfirmationDto) {
    return this.tradeConfirmationService.update(+id, updateTradeConfirmationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una confirmación de trade' })
  @ApiParam({ name: 'id', description: 'ID de la confirmación del trade' })
  @ApiResponse({ status: 200, description: 'Confirmación eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Confirmación no encontrada.' })
  remove(@Param('id') id: string) {
    return this.tradeConfirmationService.remove(+id);
  }
} 