import { Injectable } from '@nestjs/common';
import { CreateSymbolDto } from './dto/create-symbol.dto';
import { UpdateSymbolDto } from './dto/update-symbol.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class SymbolService {
  constructor(private prisma: PrismaService) {}
  create(createSymbolDto: CreateSymbolDto) {
    return this.prisma.symbol.create({
      data: createSymbolDto,
    });
  }

  findAll() {
    return this.prisma.symbol.findMany();
  }

  findOne(id: number) {
    return this.prisma.symbol.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSymbolDto: UpdateSymbolDto) {
    return this.prisma.symbol.update({
      where: { id },
      data: updateSymbolDto,
    });
  }

  remove(id: number) {
    return this.prisma.symbol.delete({
      where: { id },
    });
  }
}
