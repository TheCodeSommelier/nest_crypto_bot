import { Controller, Delete, Get, Param } from '@nestjs/common';

import { TradeService } from './trade.service';
import { OnEvent } from '@nestjs/event-emitter';
import { TradeDataParsedEvent } from 'src/trade-data-parser/events/trade-data-parsed.event';
import { TradeExecutionFuturesService } from './trade-execution-futures/trade-execution-futures.service';
import { TradeExecutionSpotService } from './trade-execution-spot/trade-execution-spot.service';

@Controller('trade')
export class TradeController {
  constructor(
    private readonly tradeService: TradeService,
    private readonly tradeExecutionFuturesService: TradeExecutionFuturesService,
    private readonly tradeExecutionSpotService: TradeExecutionSpotService,
  ) {}

  @Get()
  findAll() {
    return this.tradeService.tradeSignals();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradeService.removeTradeSignal({ id });
  }

  @OnEvent('tradeSignal.parsed')
  async processTrade(payload: TradeDataParsedEvent) {
    const tradeSignalId = payload.tradeSignalId;

    const tradeSignal = await this.tradeService.tradeSignal({
      id: tradeSignalId,
    });

    if (tradeSignal.market === 'FUTURES') {
      await this.tradeExecutionFuturesService.executeTradeCall(tradeSignal);
    }

    if (tradeSignal.market === 'SPOT') {
      await this.tradeExecutionSpotService.executeTradeCall(tradeSignal);
    }
  }
}
