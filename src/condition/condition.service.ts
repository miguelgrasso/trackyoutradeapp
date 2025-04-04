import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class ConditionService {
  constructor(private prisma: PrismaService) {}
  create(createConditionDto: CreateConditionDto) {
    return this.prisma.condition.create({
      data: createConditionDto,
    });
  }

  findAll() {
    return this.prisma.condition.findMany({
      include: {
        confirmation: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.condition.findUnique({
      where: { id },
      include: {
        confirmation: true,
      },
    });
  }

  update(id: number, updateConditionDto: UpdateConditionDto) {
    return this.prisma.condition.update({
      where: { id },
      data: updateConditionDto,
    });
  }

  remove(id: number) {
    return this.prisma.condition.delete({
      where: { id },
    });
  }
}

