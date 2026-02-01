import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import type { TradeSignal } from 'src/generated/prisma/client';
import {
  TradeSignalCreateInput,
  TradeSignalWhereUniqueInput,
} from 'src/generated/prisma/models';

@Injectable()
export class TradeService {
  constructor(private readonly prisma: PrismaService) {}

  async tradeSignal(where: TradeSignalWhereUniqueInput): Promise<TradeSignal> {
    return await this.prisma.tradeSignal.findFirstOrThrow({ where });
  }

  async tradeSignals(): Promise<TradeSignal[]> {
    return await this.prisma.tradeSignal.findMany();
  }

  async createTradeSignal(data: TradeSignalCreateInput) {
    return await this.prisma.tradeSignal.create({ data });
  }

  async removeTradeSignal(where: TradeSignalWhereUniqueInput) {
    const trade = await this.tradeSignal(where);
    await this.prisma.tradeSignal.delete({ where });

    return trade;
  }
}
