import { Test, TestingModule } from '@nestjs/testing';
import { TradeExecutionFuturesService } from './trade-execution-futures.service';

describe('TradeExecutionFuturesService', () => {
  let service: TradeExecutionFuturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeExecutionFuturesService],
    }).compile();

    service = module.get<TradeExecutionFuturesService>(TradeExecutionFuturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
