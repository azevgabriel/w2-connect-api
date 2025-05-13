import cors from 'cors';
import express from 'express';
import http from 'http';
import { routes } from '../routes';

import pino from 'pino';
import pinoHttp from 'pino-http';

export const appConfig = (): http.Server => {
  const app = express();
  const logger = pino();

  app.use(pinoHttp({ logger }));

  app.get('/', (req, res) => {
    req.log.info('Rota raiz acessada');
    res.send('Hello World!');
  });

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(routes);

  const httpServer = http.createServer(app);
  return httpServer;
};
