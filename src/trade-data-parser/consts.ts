import { TradeAction, TradeMarket } from 'src/generated/prisma/enums';

export const SUBJECT_RE =
  /^(buy|sell|long|short|cover)\s+alert\s*:\s*([A-Z0-9._-]+)\s*\/\s*([A-Z0-9._-]+)(?:\s*\(.*\))?\s*$/i;

export const ENTRY_PRICE_RE = /entry\s*:\s*\$?\s*([0-9][0-9,]*(?:\.[0-9]+)?)/i;
export const AVERAGE_PRICE_RE =
  /average\s*:\s*\$?\s*([0-9][0-9,]*(?:\.[0-9]+)?)/i;
export const STOP_PRICE_RE =
  /stop\s*:\s*([^$]*?)\$?\s*([0-9][0-9,]*(?:\.[0-9]+)?)/i;
export const TARGET_PRICE_RE =
  /target\s*:\s*\$?\s*([0-9][0-9,]*(?:\.[0-9]+)?)/i;
export const ENTRY_PERCENT_RE = /entry\s*:\s*[^%]*?([0-9]+(?:\.[0-9]+)?)\s*%/i;
export const AVERAGE_PERCENT_RE =
  /average\s*:\s*[^%]*?([0-9]+(?:\.[0-9]+)?)\s*%/i;

export const TRADE_MARKET: Record<TradeAction, TradeMarket> = {
  BUY: TradeMarket.SPOT,
  SELL: TradeMarket.SPOT,
  LONG: TradeMarket.FUTURES,
  SHORT: TradeMarket.FUTURES,
  COVER: TradeMarket.FUTURES,
};
