import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { Injectable, Logger } from '@nestjs/common';
import type { Secret } from './types/Secrets';

@Injectable()
export class SecretsService {
  private readonly logger = new Logger();

  async findSecret(id: string): Promise<Secret | undefined> {
    const client = new SecretsManagerClient({
      region: 'eu-central-1',
    });

    const command = new GetSecretValueCommand({
      SecretId: id,
    });

    const response = await client.send(command);
    if (!response.SecretString) {
      return undefined;
    }

    try {
      return JSON.parse(response.SecretString) as Secret;
    } catch {
      this.logger.warn('Secret payload is not valid JSON');
      return undefined;
    }
  }
}
