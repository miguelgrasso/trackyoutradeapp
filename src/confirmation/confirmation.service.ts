import { Injectable } from '@nestjs/common';
import { CreateConfirmationDto } from './dto/create-confirmation.dto';
import { UpdateConfirmationDto } from './dto/update-confirmation.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class ConfirmationService {
  constructor(private prisma: PrismaService) {}
  create(createConfirmationDto: CreateConfirmationDto) {
    return this.prisma.confirmation.create({
      data: createConfirmationDto,
    });
  }

  findAll() {
    return this.prisma.confirmation.findMany();
  }

  findOne(id: number) {
    return this.prisma.confirmation.findUnique({
      where: { id },
    });
  }

  findConditions(id: number) {
    return this.prisma.condition.findMany({
      where: { confirmationId: id },
    });
  }

  update(id: number, updateConfirmationDto: UpdateConfirmationDto) {
    return this.prisma.confirmation.update({
      where: { id },
      data: updateConfirmationDto,
    });
  }

  remove(id: number) {
    return this.prisma.confirmation.delete({
      where: { id },
    });
  }
}
