import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { bootstrap } from 'fastify-decorators';
import { config as dotenvConfig } from 'dotenv';

import { config } from './config.js';

dotenvConfig();

const app = fastify();

app.register(bootstrap, {
  directory: import.meta.url,
  prefix: '/v1',
});

app.register(fastifyCors);

app.listen({
  host: config.server.host ?? '0.0.0.0',
  port: config.server.port ?? 3000,
}).then((address) => {
  console.info(`server listening on ${address}`);
}, (e) => {
  if (e instanceof Error) {
    console.error(`${e.name}: ${e.message}\n${e.stack}`);
  } else {
    console.error(`Unknown Error: ${e}`);
  }
});
