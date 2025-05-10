export interface BaseErrorModel {
  name: string;
  message: string;
  action?: string | object;
  statusCode: number;
  key?: string;
  errorLocationCode?: string;
  databaseErrorCode?: string;
  context?: string;
}
