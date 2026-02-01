import { Injectable } from '@nestjs/common';
import { TradeAction } from 'src/generated/prisma/enums';
import {
  cleanInboundText,
  htmlToText,
  normalizeSubject,
  parseMoney,
  parsePercent,
} from './utils/textParserUtils';

import type {
  ParsedEmailTrade,
  ParsedSubject,
  ParsedTradeFields,
} from './types/Parser';
import {
  AVERAGE_PRICE_RE,
  AVERAGE_PERCENT_RE,
  ENTRY_PRICE_RE,
  ENTRY_PERCENT_RE,
  STOP_PRICE_RE,
  SUBJECT_RE,
  TARGET_PRICE_RE,
  TRADE_MARKET,
} from './consts';

@Injectable()
export class TradeDataParserService {
  parseEmail(input: {
    subject: string;
    textBody?: string | null;
    htmlBody?: string | null;
  }): ParsedEmailTrade {
    const textBody = input.textBody?.trim()
      ? input.textBody
      : htmlToText(input.htmlBody);
    const subject = this.parseSubject(input.subject);
    const fields = this.extractTradeFields(textBody ?? '');

    return { ...subject, ...fields };
  }

  // ======= HELPERS =======

  private parseSubject(rawSubject: string): ParsedSubject {
    const normalizedSubject = normalizeSubject(rawSubject);

    const m = normalizedSubject.match(SUBJECT_RE);

    if (!m) {
      throw new Error(`Unrecognized subject format: "${normalizedSubject}"`);
    }

    const action = m[1]?.toUpperCase() as TradeAction;
    const base = m[2].toUpperCase();
    const quote = m[3].toUpperCase();

    const symbol = `${base}/${quote}` as const;

    if (!action || !(action in TRADE_MARKET)) {
      throw new Error(`Unrecognized action: "${action}"`);
    }
    const market = TRADE_MARKET[action];

    return { action, market, symbol, base, quote };
  }

  private extractTradeFields(textBody: string): ParsedTradeFields {
    const cleaned = cleanInboundText(textBody);
    const lines = cleaned
      .split('\n')
      .map((line) => line.replace(',', '').trim())
      .filter((line) => line.length > 0);

    const entryMatch =
      this.findFirstMatch(lines, ENTRY_PRICE_RE) ??
      cleaned.match(ENTRY_PRICE_RE);

    const averageMatch =
      this.findFirstMatch(lines, AVERAGE_PRICE_RE) ??
      cleaned.match(AVERAGE_PRICE_RE);

    const targetMatch =
      this.findFirstMatch(lines, TARGET_PRICE_RE) ??
      cleaned.match(TARGET_PRICE_RE);

    const stopMatch =
      this.findFirstMatch(lines, STOP_PRICE_RE) ?? cleaned.match(STOP_PRICE_RE);

    const entry = parseMoney(entryMatch?.[1]);
    const average = parseMoney(averageMatch?.[1]);
    const target = parseMoney(targetMatch?.[1]);
    const stopLoss = parseMoney(stopMatch?.[2]);

    const entryPctMatch =
      this.findFirstMatch(lines, ENTRY_PERCENT_RE) ??
      cleaned.match(ENTRY_PERCENT_RE);

    const averagePctMatch =
      this.findFirstMatch(lines, AVERAGE_PERCENT_RE) ??
      cleaned.match(AVERAGE_PERCENT_RE);

    const entryPortfolioPct = parsePercent(entryPctMatch?.[1]);

    const averagePortfolioPct = parsePercent(averagePctMatch?.[1]);

    if (!entry || !stopLoss || !target) {
      throw new Error('Required prices were not extracted');
    }

    return {
      entry,
      average,
      stopLoss,
      target,
      entryPortfolioPct,
      averagePortfolioPct,
    };
  }

  private findFirstMatch(lines: string[], re: RegExp): RegExpMatchArray | null {
    for (const line of lines) {
      const match = line.match(re);
      if (match) {
        return match;
      }
    }

    return null;
  }
}
