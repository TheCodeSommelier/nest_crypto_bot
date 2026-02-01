import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { firstValueFrom } from 'rxjs';

import { TradeSignalModel } from 'src/generated/prisma/models';
import { getNonce, mapToURLValues, sign } from '../utils/kraken';
import {
  SPOT_PRIVATE_ENDPOINT,
  SPOT_PRIVATE_URL,
  SPOT_PUBLIC_URL,
} from '../consts';
import { AccountBalanceResponse } from '../types/kraken/spot/Account';
import { AssetPairInfoResponse } from '../types/kraken/spot/Market';

@Injectable()
export class TradeExecutionSpotService {
  private readonly logger = new Logger(TradeExecutionSpotService.name);

  constructor(private readonly http: HttpService) {}

  async executeTradeCall(tradeSignal: TradeSignalModel) {
    this.logger.debug('SPOT', tradeSignal);

    const pairInfo = await this.getAssetPairInfo(tradeSignal.symbol);
    this.logger.debug(pairInfo);
  }

  async getAccountBalance() {
    const nonce = getNonce();
    const body = mapToURLValues({ nonce });
    const bodyString = body.toString();

    const headers = this.getHeaders(
      bodyString,
      nonce,
      `${SPOT_PRIVATE_ENDPOINT}/Balance`,
    );

    const { data } = await firstValueFrom(
      this.http.post<AccountBalanceResponse>(
        `${SPOT_PRIVATE_URL}/Balance`,
        bodyString,
        {
          headers,
        },
      ),
    );

    return data.result;
  }

  private getHeaders(dataString = '', nonce = '', endpoint = '') {
    return {
      'API-Key': process.env.KRAKEN_API_KEY_SPOT!,
      'API-Sign': this.getSignature(dataString, nonce, endpoint),
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  private async getAssetPairInfo(pair: string) {
    const params = mapToURLValues({ pair });
    const { data } = await firstValueFrom(
      this.http.get<AssetPairInfoResponse>(
        `${SPOT_PUBLIC_URL}/AssetPairs?${params.toString()}`,
      ),
    );

    return data.result[pair];
  }

  private getSignature(data = '', nonce = '', endpoint = '') {
    return sign({
      privKey: process.env.KRAKEN_API_PRIVATE_KEY_SPOT!,
      message:
        endpoint +
        createHash('sha256')
          .update(nonce + data)
          .digest('binary'),
    });
  }
}
