import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class ResultService {
  constructor(private prisma: PrismaService) {}

  create(createResultDto: CreateResultDto) {
    return this.prisma.result.create({
      data: createResultDto,
    });
  }

  findAll() {
    return this.prisma.result.findMany();
  }

  findOne(id: number) {
    return this.prisma.result.findUnique({
      where: { id },
    });
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return this.prisma.result.update({
      where: { id },
      data: updateResultDto,
    });
  }

  remove(id: number) {
    return this.prisma.result.delete({
      where: { id },
    });
  }
}
