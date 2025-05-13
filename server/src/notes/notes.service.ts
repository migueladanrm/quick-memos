import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from '~/prisma';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return await this.prisma.note.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async count() {
    return await this.prisma.note.count();
  }

  async create(payload: Prisma.NoteCreateInput) {
    return await this.prisma.note.create({
      data: payload,
    });
  }

  async delete(id: number) {
    return await this.prisma.note.delete({
      where: {
        id,
      },
    });
  }

  async get(id: number) {
    return await this.prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  async search(query: string) {
    return await this.prisma.note.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            content: {
              contains: query,
            },
          },
        ],
      },
    });
  }

  async update(id: number, payload: Prisma.NoteUpdateInput) {
    return await this.prisma.note.update({
      where: {
        id,
      },
      data: payload,
    });
  }
}
