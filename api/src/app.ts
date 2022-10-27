import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { codegenMercurius } from 'mercurius-codegen';
import cors from '@fastify/cors';
import mercurius from 'mercurius';
import { resolvers, schema } from './graphql';
// import { loaders, resolvers, schema } from './graphql'
import db from './config/db';
import { PromiseType } from './config/types';

export const app = Fastify({
  logger: process.env.NODE_ENV !== 'test',
  pluginTimeout: 20000,
});

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers.authorization,
  };
};

declare module 'mercurius' {
  type MercuriusContext = PromiseType<ReturnType<typeof buildContext>>;
}

app.register(cors);

app.register(db);

app.register(mercurius, {
  schema,
  resolvers,
  // loaders,
  context: buildContext,
  subscription: true,
  graphiql: 'graphiql',
});

// healthcheck endpoint
app.get('/ping', (_: FastifyRequest, reply: FastifyReply) =>
  reply.send({ ok: true })
);

codegenMercurius(app, {
  targetPath: './src/graphql/generated/index.ts',
  operationsGlob: './src/graphql/operations/*.gql',
  codegenConfig: {
    loadersCustomParentTypes: {
      Human: 'never',
    },
  },
}).catch((err) => {
  console.error(err);
});
