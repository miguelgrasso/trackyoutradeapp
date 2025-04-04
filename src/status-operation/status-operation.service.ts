import { Injectable } from '@nestjs/common';
import { CreateStatusOperationDto } from './dto/create-status-operation.dto';
import { UpdateStatusOperationDto } from './dto/update-status-operation.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class StatusOperationService {
  constructor(private prisma: PrismaService) {}
  create(createStatusOperationDto: CreateStatusOperationDto) {
    return this.prisma.statusOperation.create({
      data: createStatusOperationDto,
    });
  }

  findAll() {
    return this.prisma.statusOperation.findMany();
  }

  findOne(id: number) {
    return this.prisma.statusOperation.findUnique({
      where: { id },
    });
  }

  update(id: number, updateStatusOperationDto: UpdateStatusOperationDto) {
    return this.prisma.statusOperation.update({
      where: { id },
      data: updateStatusOperationDto,
    });
  }

  remove(id: number) {
    return this.prisma.statusOperation.delete({
      where: { id },
    });
  }
}
