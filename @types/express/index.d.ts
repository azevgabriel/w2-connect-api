declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
    };
    log: pino.Logger<never, boolean>;
  }
}
