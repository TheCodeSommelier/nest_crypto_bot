import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';

import { AppModule } from './app.module';

let cached;

async function bootstrap() {
  const app = express();

  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));
  await nestApp.init();

  return serverlessExpress({ app });
}

export const handler = async (event: any, context: any) => {
  cached ??= await bootstrap();
  return cached(event, context);
};
