import { Controller, Get, Logger } from '@nestjs/common';
import { SecretsService } from './secrets.service';

@Controller('secrets')
export class SecretsController {
  private readonly logger = new Logger(SecretsController.name);

  constructor(private readonly secretsService: SecretsService) {}

  @Get()
  async secret() {
    const secrets = await this.secretsService.findSecret('nest-bot/dev/test');
    this.logger.debug(secrets);

    return secrets;
  }
}
