import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SecretsService {
  private readonly logger = new Logger();

  async getSecret(arn: string) {
    const client = new SecretsManagerClient();
    const command = new GetSecretValueCommand({
      SecretId: arn,
    });

    try {
      const result = await client.send(command);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Secret could not be retrieved');
    }
  }
}
