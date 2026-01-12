import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateTradesDto } from './create-trades.dto';

export class CreateTradeDto extends CreateTradesDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
