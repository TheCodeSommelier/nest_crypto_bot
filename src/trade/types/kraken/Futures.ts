export interface TickersInfoResponse {
  result: 'success' | 'fail';
  serverTime: Date;
  tickers: Ticker[];
}

export enum TickerTag {
  Perpetual = 'perpetual',
  Month = 'month',
  Quarter = 'quarter',
  Semiannual = 'semiannual',
}

export interface Ticker {
  symbol: `PF_${Uppercase<string>}`;
  last: number;
  lastTime: Date;
  tag: TickerTag;
  pair: `${Uppercase<string>}:${Uppercase<string>}`;
  markPrice: number;
  bid: number;
  bidSize: number;
  ask: number;
  askSize: number;
  vol24h: number;
  volumeQuote: number;
  openInterest: number;
  open24h: number;
  high24h: number;
  low24h: number;
  lastSize: number;
  fundingRate: number;
  fundingRatePrediction: number;
  suspended: boolean;
  indexPrice: number;
  postOnly: boolean;
  change24h: number;
}
