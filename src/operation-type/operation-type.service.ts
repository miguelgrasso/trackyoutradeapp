import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOperationTypeDto } from './dto/create-operation-type.dto';
import { UpdateOperationTypeDto } from './dto/update-operation-type.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class OperationTypeService {
  constructor(private prisma: PrismaService) {}
  async create(createOperationTypeDto: CreateOperationTypeDto) {
    try{
      return await this.prisma.operationType.create({
        data: createOperationTypeDto,
      });
    }catch (error) {
      // Captura el mensaje de error de Prisma
      if (error instanceof Error) {
        console.log("aqui estoy")
        console.log('Error de Prisma:', error.message); // Imprime el error en la consola
        throw new BadRequestException(error.message); // Devuelve el mensaje de error de la base de datos
      }
      throw new BadRequestException('An unexpected error occurred.');
    }

  }

  findAll() {
    return this.prisma.operationType.findMany();
  }

  findOne(id: number) {
    return this.prisma.operationType.findUnique({
      where: { id },
    });
  }

  update(id: number, updateOperationTypeDto: UpdateOperationTypeDto) {
    return this.prisma.operationType.update({
      where: { id },
      data: updateOperationTypeDto,
    });
  }

  remove(id: number) {
    return this.prisma.operationType.delete({
      where: { id },
    });
  }
}
