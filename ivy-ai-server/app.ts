import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { schema } from './src/graphql/schemas/index';
import { context } from './src/graphql/context';
dotenv.config();

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

const server = new ApolloServer({ schema });

const init = async () => {
  const graphqlUploadExress = (await import('graphql-upload/graphqlUploadExpress.mjs')).default;

  app.use(graphqlUploadExress());

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: context,
    })
  );

  const port = process.env.PORT || 54321;

  await new Promise<void>((resolve) => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);

  app.get('/health', (req, res) => {
    res.status(200).send('Okay!');
  });
};

init();