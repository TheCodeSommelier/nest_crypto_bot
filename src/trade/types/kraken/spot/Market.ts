import { Pair } from '..';

export interface AssetPairInfoResponse {
  error: [];
  result: Record<string, AssetPairInfo>;
}

export enum AssetPairStatus {
  Online = 'online',
  CancelOnly = 'cancel_only',
  PostOnly = 'post_only',
  LimitOnly = 'limit_only',
  ReduceOnly = 'reduce_only',
}

export type SpotQuote = 'ZEUR' | 'ZUSD';

export interface AssetPairInfo {
  altname: Uppercase<string>;
  wsname: Pair;
  aclass_base: 'currency';
  base: Uppercase<string>;
  aclass_quote: 'currency';
  quote: SpotQuote;
  cost_decimals: number;
  pair_decimals: number;
  lot_decimals: number;
  lot_multiplier: number;
  leverage_buy: number[];
  leverage_sell: number[];
  fees: [number[]];
  fees_maker: [number[]];
  fee_volume_currency: SpotQuote;
  margin_call: number;
  margin_stop: number;
  ordermin: `${number}`;
  costmin: `${number}`;
  tick_size: `${number}`;
  status: AssetPairStatus;
}
