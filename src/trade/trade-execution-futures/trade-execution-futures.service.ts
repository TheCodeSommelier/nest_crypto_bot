import { Injectable, Logger } from '@nestjs/common';
import { TradeSignalModel } from 'src/generated/prisma/models';

@Injectable()
export class TradeExecutionFuturesService {
  private readonly logger = new Logger(TradeExecutionFuturesService.name);

  // 🚨 REMOVE
  // eslint-disable-next-line
  async executeTradeCall(tradeSignal: TradeSignalModel) {
    this.logger.debug('FUTURES', tradeSignal);
  }
}
