import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('trades')
@Controller('trades')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva operación de trading' })
  @ApiResponse({ status: 201, description: 'La operación ha sido creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados.' })
  @ApiBody({ type: CreateTradeDto })
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.create(createTradeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las operaciones de trading' })
  @ApiResponse({ status: 200, description: 'Lista de operaciones recuperada exitosamente.' })
  findAll() {
    return this.tradeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una operación de trading por ID' })
  @ApiParam({ name: 'id', description: 'ID de la operación' })
  @ApiResponse({ status: 200, description: 'Operación encontrada.' })
  @ApiResponse({ status: 404, description: 'Operación no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.tradeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una operación de trading' })
  @ApiParam({ name: 'id', description: 'ID de la operación' })
  @ApiResponse({ status: 200, description: 'Operación actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Operación no encontrada.' })
  @ApiBody({ type: UpdateTradeDto })
  update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradeService.update(+id, updateTradeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una operación de trading' })
  @ApiParam({ name: 'id', description: 'ID de la operación' })
  @ApiResponse({ status: 200, description: 'Operación eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Operación no encontrada.' })
  remove(@Param('id') id: string) {
    return this.tradeService.remove(+id);
  }
}
