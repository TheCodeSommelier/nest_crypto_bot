import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { createHash } from 'node:crypto';
import { firstValueFrom } from 'rxjs';

import { TradeSignalModel } from 'src/generated/prisma/models';
import { getNonce, sign } from '../utils/kraken';
import { type TickersInfoResponse, TickerTag } from '../types/kraken/Futures';
import { FUTURES_BASE_URL } from '../consts';

@Injectable()
export class TradeExecutionFuturesService {
  private readonly logger = new Logger(TradeExecutionFuturesService.name);

  constructor(private readonly http: HttpService) {}

  async executeTradeCall(tradeSignal: TradeSignalModel) {
    this.logger.debug('FUTURES', tradeSignal);
    const nonce = getNonce();
    this.logger.debug('Nonce', nonce);
    const signature = this.getSignature('', nonce, 'endpoint');
    this.logger.debug(signature);

    const tickers = await this.getPerpetualTickers();
    this.logger.debug(tickers);
  }

  private async getPerpetualTickers() {
    const { data } = await firstValueFrom(
      this.http.get<TickersInfoResponse>(`${FUTURES_BASE_URL}/tickers`),
    );

    if (data.result === 'success') {
      return data.tickers.filter((t) => t.tag === TickerTag.Perpetual);
    }
  }

  private getSignature(data = '', nonce = '', endpoint = '') {
    return sign({
      message: createHash('sha256')
        .update(data + nonce + endpoint.replace('/derivatives', ''))
        .digest('binary'),
    });
  }
}
