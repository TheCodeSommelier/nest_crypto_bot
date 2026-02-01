import { TradeAction, TradeMarket } from 'src/generated/prisma/enums';

export type ParsedSubject = {
  action: TradeAction;
  market: TradeMarket;
  symbol: `${string}/${string}`;
  base: string;
  quote: string;
};

export type ParsedTradeFields = {
  entry: number | null;
  average: number | null;
  stopLoss: number | null;
  target: number | null;
  entryPortfolioPct: number | null;
  averagePortfolioPct: number | null;
};

export type ParsedEmailTrade = ParsedSubject & ParsedTradeFields;
