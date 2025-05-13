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
      targets: [
        {
          target: 'pino-pretty',
          options: {
            levelFirst: true,
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
        {
          target: 'pino/file',
          options: {
            destination: process?.env?.PINO_LOG_FILE || './logs/app.log',
            mkdir: true,
          },
        },
      ],
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
