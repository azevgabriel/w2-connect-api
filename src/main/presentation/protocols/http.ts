import { Logger } from 'pino';

export interface HttpResponse {
  statusCode: number;
  body: any;
  type?: string;
  headers?: { key: string; value: string }[];
}

export interface RequestParams {
  [key: string]: string;
}

export interface RequestQueryString {
  [key: string]: undefined | string | string[];
}

export interface HttpRequest {
  user?: any;
  headers?: any;
  params?: any;
  query?: any;
  body?: any;
  path?: string;
  method?: string;
  files?: File[];
  ip?: any;
  log: Logger<never, boolean>;
}
