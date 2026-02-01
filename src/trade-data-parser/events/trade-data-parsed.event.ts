export class TradeDataParsedEvent {
  tradeSignalId: string;

  constructor(tradeSignalId: string) {
    this.tradeSignalId = tradeSignalId;
  }
}
