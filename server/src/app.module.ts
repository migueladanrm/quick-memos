import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma/prisma.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [NotesModule, HealthModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
