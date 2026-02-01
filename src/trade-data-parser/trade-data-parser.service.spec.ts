import { Test, TestingModule } from '@nestjs/testing';
import { TradeDataParserService } from './trade-data-parser.service';

describe('TradeDataParserService', () => {
  let service: TradeDataParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeDataParserService],
    }).compile();

    service = module.get<TradeDataParserService>(TradeDataParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
