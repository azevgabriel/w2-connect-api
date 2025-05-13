import cors from 'cors';
import express from 'express';
import http from 'http';
import { routes } from '../routes';

import pino from 'pino';
import pinoHttp from 'pino-http';

export const appConfig = (): http.Server => {
  const app = express();

  const logger = pino({
    level: process?.env?.PINO_LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        levelFirst: true,
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
    redact: ['user.password'],
  });

  app.use(pinoHttp({ logger }));

  app.get('/', (req, res) => {
    req.log.info('Health check');
    res.send({
      name: 'Wconnect API - Service of Trips Reservation',
      version: '1.0.0',
      status: 'OK',
    });
  });

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(routes);

  const httpServer = http.createServer(app);
  return httpServer;
};
