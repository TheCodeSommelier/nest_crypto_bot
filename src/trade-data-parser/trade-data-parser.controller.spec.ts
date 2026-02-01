import { Test, TestingModule } from '@nestjs/testing';
import { TradeDataParserController } from './trade-data-parser.controller';

describe('TradeDataParserController', () => {
  let controller: TradeDataParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradeDataParserController],
    }).compile();

    controller = module.get<TradeDataParserController>(
      TradeDataParserController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
