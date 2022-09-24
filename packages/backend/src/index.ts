import fastify from 'fastify';
import * as pug from 'pug';

const app = fastify();

app.get('/', async (request, reply) => {
    reply.statusCode = 404;
});

app.listen({
    port: 3000,
}).then((address) => {
    console.info(`server listening on ${address}`);
});
