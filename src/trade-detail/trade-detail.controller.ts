import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradeDetailService } from './trade-detail.service';
import { CreateTradeDetailDto } from './dto/create-trade-detail.dto';
import { UpdateTradeDetailDto } from './dto/update-trade-detail.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Trade Details')
@Controller('trade-details')
export class TradeDetailController {
  constructor(private readonly tradeDetailService: TradeDetailService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo detalle de trade' })
  @ApiResponse({ status: 201, description: 'El detalle ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados.' })
  create(@Body() createTradeDetailDto: CreateTradeDetailDto) {
    return this.tradeDetailService.create(createTradeDetailDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un detalle de trade por su ID' })
  @ApiParam({ name: 'id', description: 'ID del detalle del trade' })
  @ApiResponse({ status: 200, description: 'Detalle encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tradeDetailService.findOne(+id);
  }

  @Get('trade/:tradeId')
  @ApiOperation({ summary: 'Obtener un detalle de trade por el ID del trade' })
  @ApiParam({ name: 'tradeId', description: 'ID del trade' })
  @ApiResponse({ status: 200, description: 'Detalle encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle no encontrado.' })
  findByTradeId(@Param('tradeId') tradeId: string) {
    return this.tradeDetailService.findByTradeId(+tradeId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un detalle de trade' })
  @ApiParam({ name: 'id', description: 'ID del detalle del trade' })
  @ApiResponse({ status: 200, description: 'Detalle actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle no encontrado.' })
  update(@Param('id') id: string, @Body() updateTradeDetailDto: UpdateTradeDetailDto) {
    return this.tradeDetailService.update(+id, updateTradeDetailDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un detalle de trade' })
  @ApiParam({ name: 'id', description: 'ID del detalle del trade' })
  @ApiResponse({ status: 200, description: 'Detalle eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle no encontrado.' })
  remove(@Param('id') id: string) {
    return this.tradeDetailService.remove(+id);
  }
} 