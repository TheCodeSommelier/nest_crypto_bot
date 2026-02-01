import { Test, TestingModule } from '@nestjs/testing';
import { TradeExecutionSpotService } from './trade-execution-spot.service';

describe('TradeExecutionSpotService', () => {
  let service: TradeExecutionSpotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeExecutionSpotService],
    }).compile();

    service = module.get<TradeExecutionSpotService>(TradeExecutionSpotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
