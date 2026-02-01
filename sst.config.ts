/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'nest-bot',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
    };
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2("Api");
    const DatabaseUrl = new sst.Secret("DATABASE_URL");
    const DirectUrl = new sst.Secret("DIRECT_URL");

    api.route("$default", {
      handler: "src/lambda.ts",
      architecture: "arm64",
      runtime: "nodejs22.x",
      timeout: "2 minutes",
      memory: "1024 MB",
      link: [DatabaseUrl, DirectUrl],
      permissions: [
        {
          actions: [
            "secretsmanager:GetSecretValue",
            "secretsmanager:DescribeSecret",
          ],
          resources: [
            `arn:aws:secretsmanager:*:*:secret:${$app.name}/${$app.stage}/*`,
          ],
        },
      ],
      nodejs: {
        esbuild: {
          external: [
            "@nestjs/microservices",
            "@nestjs/microservices/microservices-module",
            "@nestjs/websockets",
            "@nestjs/websockets/socket-module",
          ],
        },
      },
    });

    return { apiUrl: api.url };
  },
});
