import express from "express";
import http from "http";

export const appConfig = (): http.Server => {
  const app = express();

  //   app.use(timeout("30s"));
  app.use(express.json({ limit: "1mb" }));
  //   app.use(routerConfig());

  const httpServer = http.createServer(app);
  return httpServer;
};
