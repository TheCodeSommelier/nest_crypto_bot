import { Injectable, Logger } from '@nestjs/common';
import { TradeSignalModel } from 'src/generated/prisma/models';

@Injectable()
export class TradeExecutionSpotService {
  private readonly logger = new Logger(TradeExecutionSpotService.name);

  // 🚨 REMOVE
  // eslint-disable-next-line
  async executeTradeCall(tradeSignal: TradeSignalModel) {
    this.logger.debug('SPOT', tradeSignal);
  }
}
