export enum OrderType {
  Market = 'market',
  Limit = 'limit',
  Iceberg = 'iceberg',
  StopLoss = 'stop-loss',
  TakeProfit = 'take-profit',
  StopLossLimit = 'stop-loss-limit',
  TakeProfitLimit = 'take-profit-limit',
  TrailingStop = 'trailing-stop',
  TrailingStopLimit = 'trailing-stop-limit',
  SettlePosition = 'settle-position',
}

export type SpotTradeAction = 'buy' | 'sell';

export type Pair = `${Uppercase<string>}/${Uppercase<string>}`;
