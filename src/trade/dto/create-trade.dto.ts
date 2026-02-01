import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { TradeAction } from 'src/generated/prisma/enums';

export class CreateTradeDto {
  @IsUUID()
  symbol: string;

  @IsNotEmpty()
  @IsEnum(TradeAction)
  action: TradeAction;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  entry: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  stopLoss: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  target: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  entryPortfolioPct?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  averagePortfolioPct?: number;

  @IsUUID()
  emailId: string;
}
