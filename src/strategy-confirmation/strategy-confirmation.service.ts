import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStrategyConfirmationDto } from './dto/create-strategy-confirmation.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class StrategyConfirmationService {
  constructor(private prisma: PrismaService) {}

  // Crear una relación entre estrategia y confirmación
  async create(createDto: CreateStrategyConfirmationDto) {
    try {
      // Verificamos que existan tanto la estrategia como la confirmación
      const strategy = await this.prisma.strategy.findUnique({
        where: { id: createDto.strategyId }
      });
      
      if (!strategy) {
        throw new NotFoundException(`Strategy with ID ${createDto.strategyId} not found`);
      }
      
      const confirmation = await this.prisma.confirmation.findUnique({
        where: { id: createDto.confirmationId }
      });
      
      if (!confirmation) {
        throw new NotFoundException(`Confirmation with ID ${createDto.confirmationId} not found`);
      }
      
      // Aseguramos que haya un status por defecto si no se proporciona
      const status = createDto.status || 'active';
      
      // Crear la relación usando el método executeRaw para ejecutar SQL directamente
      await this.prisma.$executeRaw`
        INSERT INTO strategy_confirmation (
          "strategyId", "confirmationId", "status", "createdAt"
        ) VALUES (
          ${createDto.strategyId}, ${createDto.confirmationId}, ${status}, NOW()
        ) ON CONFLICT ("strategyId", "confirmationId") DO UPDATE
        SET "status" = ${status};
      `;
      
      return {
        strategyId: createDto.strategyId,
        confirmationId: createDto.confirmationId,
        status: status,
        created: true
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Si el error no es NotFoundException, es probablemente un error de la base de datos
      return {
        strategyId: createDto.strategyId,
        confirmationId: createDto.confirmationId,
        error: error.message
      };
    }
  }

  // Obtener todas las relaciones
  async findAll() {
    // Usar SQL directo
    const relations = await this.prisma.$queryRaw`
      SELECT sc."strategyId", sc."confirmationId", sc."status", sc."createdAt", 
             s.name as strategy_name, c.name as confirmation_name
      FROM strategy_confirmation sc
      JOIN "Strategy" s ON sc."strategyId" = s.id
      JOIN "Confirmation" c ON sc."confirmationId" = c.id
    `;
    
    return relations;
  }

  // Obtener las confirmaciones de una estrategia
  async findConfirmationsByStrategy(strategyId: number) {
    // Verificar que la estrategia existe
    const strategy = await this.prisma.strategy.findUnique({
      where: { id: strategyId }
    });
    
    if (!strategy) {
      throw new NotFoundException(`Strategy with ID ${strategyId} not found`);
    }
    
    // Obtener las confirmaciones usando SQL directo
    const confirmations = await this.prisma.$queryRaw`
      SELECT c.*, sc.status as relation_status
      FROM "Confirmation" c
      JOIN strategy_confirmation sc ON c.id = sc."confirmationId"
      WHERE sc."strategyId" = ${strategyId}
    `;
    
    return confirmations;
  }

  // Obtener las estrategias de una confirmación
  async findStrategiesByConfirmation(confirmationId: number) {
    // Verificar que la confirmación existe
    const confirmation = await this.prisma.confirmation.findUnique({
      where: { id: confirmationId }
    });
    
    if (!confirmation) {
      throw new NotFoundException(`Confirmation with ID ${confirmationId} not found`);
    }
    
    // Obtener las estrategias usando SQL directo
    const strategies = await this.prisma.$queryRaw`
      SELECT s.*, sc.status as relation_status
      FROM "Strategy" s
      JOIN strategy_confirmation sc ON s.id = sc."strategyId"
      WHERE sc."confirmationId" = ${confirmationId}
    `;
    console.log("strategies", strategies);
    return strategies;
  }

  // Actualizar el estado de una relación
  async updateStatus(strategyId: number, confirmationId: number, status: string) {
    try {
      // Verificar si la relación existe
      const relationExists = await this.prisma.$queryRaw`
        SELECT COUNT(*) FROM strategy_confirmation
        WHERE "strategyId" = ${strategyId} AND "confirmationId" = ${confirmationId}
      `;
      
      const result = relationExists as { count: number }[];
      
      if (!result[0].count || result[0].count === 0) {
        throw new NotFoundException(`Relation between Strategy ${strategyId} and Confirmation ${confirmationId} not found`);
      }
      
      // Actualizar el estado
      await this.prisma.$executeRaw`
        UPDATE strategy_confirmation
        SET "status" = ${status}
        WHERE "strategyId" = ${strategyId} AND "confirmationId" = ${confirmationId}
      `;
      
      return {
        strategyId,
        confirmationId,
        status,
        updated: true
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update status: ${error.message}`);
    }
  }

  // Eliminar una relación
  async remove(strategyId: number, confirmationId: number) {
    try {
      // Eliminar usando SQL directo
      await this.prisma.$executeRaw`
        DELETE FROM strategy_confirmation
        WHERE "strategyId" = ${strategyId} AND "confirmationId" = ${confirmationId}
      `;
      
      return { 
        strategyId, 
        confirmationId, 
        deleted: true 
      };
    } catch (error) {
      throw new NotFoundException(`Relation between Strategy ${strategyId} and Confirmation ${confirmationId} not found`);
    }
  }
}
