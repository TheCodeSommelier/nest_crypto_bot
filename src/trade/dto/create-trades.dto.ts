import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TradeAction } from 'src/generated/prisma/enums';

export class CreateTradesDto {
  @IsString()
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

  @IsUUID()
  @IsNotEmpty()
  emailId: string;
}
