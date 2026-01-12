import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import type { TradeCreateInput } from 'src/generated/prisma/models';

@Injectable()
export class TradeService {
  constructor(private readonly prisma: PrismaService) {}

  async trade(id: string) {
    return await this.prisma.trade.findFirstOrThrow({
      where: { id },
    });
  }

  async trades() {
    return await this.prisma.trade.findMany();
  }

  async createTrade(tradeData: TradeCreateInput) {
    return await this.prisma.trade.create({ data: tradeData });
  }

  async createTrades(tradesData: TradeCreateInput[]) {
    return await this.prisma.$transaction(
      tradesData.map((tradeData) =>
        this.prisma.trade.create({ data: tradeData }),
      ),
    );
  }
}
