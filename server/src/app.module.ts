import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [NotesModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
