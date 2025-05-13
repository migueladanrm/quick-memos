import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    this.$on('query', (e: Prisma.QueryEvent) => {
      this.logger.log(`Executed SQL Query: ${e.query}`);
    });
  }
}
