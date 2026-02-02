# Nest Bot

Event-driven NestJS service for turning unstructured trade alerts into normalized trade signals, tracking their lifecycle, and preparing them for execution.

## Wanted Result

The target outcome of this project is:

- reliably parse incoming trade alerts into structured data (`action`, `symbol`, `entry`, `stop`, `target`, sizing, author),
- track the full trade lifecycle (open -> add -> close),
- keep execution metadata attached to each lifecycle step,
- make the pipeline testable and deterministic so behavior is predictable in production.

## How It Works

At a high level:

1. Ingestion endpoint receives a raw signal payload.
2. Parser normalizes subject/body into structured trade fields.
3. A `TradeSignal` record is created in Postgres via Prisma.
4. Follow-up lifecycle events can be stored as extensions (for add/close actions).
5. Execution services can place orders and persist execution state.

## Tech Stack

- NestJS (modular app + event emitter)
- Prisma + PostgreSQL
- TypeScript
- SST + AWS Lambda/API Gateway deployment path

## Project Structure

- `src/trade-data-parser` - parsing logic, regex constants, parser tests
- `src/trade` - trade signal services and execution paths
- `src/secrets` - runtime secret retrieval
- `src/user` - user/domain ownership data
- `prisma/schema.prisma` - data model and relations
- `sst.config.ts` - serverless infrastructure config
- `src/lambda.ts` - Lambda handler bootstrap

## Getting Started

Install dependencies:

```bash
yarn install
```

Create environment variables (for example in `.env`):

- `DATABASE_URL`
- `DIRECT_URL` (if used in your db setup)

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations (if needed):

```bash
npx prisma migrate dev
```

Start locally:

```bash
yarn start:dev
```

## Tests

Run all tests:

```bash
yarn test
```

Run parser tests only:

```bash
yarn test trade-data-parser.service.spec.ts
```

Coverage:

```bash
yarn test:cov
```

## Build

```bash
yarn build
```

## Deploy (SST)

Use SST for serverless deployment workflows:

```bash
npx sst dev
npx sst deploy
```

