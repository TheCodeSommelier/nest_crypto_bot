import { UUID } from 'node:crypto';
import { OrderType, SpotTradeAction } from '..';

export interface TradeCall {
  nonce: number;
  ordertype: OrderType;
  type: SpotTradeAction;
  volume: number;
  pair: Uppercase<string>;
  price: `${number}`;
  cl_ord_id: UUID;
}
