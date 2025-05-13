import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Prisma } from 'generated/prisma';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async list() {
    return this.notesService.list();
  }

  @Get('count')
  async count() {
    return this.notesService.count();
  }

  @Post()
  async create(@Body() createNoteDto: Prisma.NoteCreateInput) {
    return this.notesService.create(createNoteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notesService.delete(Number(id));
  }

  @Get('search')
  async search(@Query('query') query: string) {
    return this.notesService.search(query);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.notesService.get(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: Prisma.NoteUpdateInput,
  ) {
    return this.notesService.update(Number(id), updateNoteDto);
  }
}
