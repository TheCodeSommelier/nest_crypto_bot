import { UUID } from 'crypto';

export type OrderType =
  | 'market'
  | 'limit'
  | 'iceberg'
  | 'stop-loss'
  | 'take-profit'
  | 'stop-loss-limit'
  | 'take-profit-limit'
  | 'trailing-stop'
  | 'trailing-stop-limit'
  | 'settle-position';

export type Type = 'buy' | 'sell';

export interface Trade {
  nonce: number;
  ordertype: OrderType;
  type: Type;
  volume: number;
  pair: Uppercase<string>;
  price: `${number}`;
  cl_ord_id: UUID;
}
