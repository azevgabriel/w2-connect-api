import express from 'express';
import http from 'http';
import { routes } from '../routes';

export const appConfig = (): http.Server => {
  const app = express();

  app.use(express.json({ limit: '1mb' }));
  app.use(routes);

  const httpServer = http.createServer(app);
  return httpServer;
};
