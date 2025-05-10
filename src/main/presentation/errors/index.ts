import { BaseErrorModel } from '@/domain/errors';

export class BaseError extends Error {
  public action?: string | object;
  public statusCode: number;
  public requestId?: string;
  public context?: any;
  public errorLocationCode?: string;
  public key?: string;
  public type?: string;
  public databaseErrorCode?: string;

  constructor({
    name,
    message,
    action,
    statusCode,
    context,
    errorLocationCode,
    key,
    databaseErrorCode,
  }: BaseErrorModel) {
    super(message);
    this.name = name;
    this.action = action;
    this.statusCode = statusCode || 500;
    this.context = context;
    this.errorLocationCode = errorLocationCode;
    this.key = key;
    this.databaseErrorCode = databaseErrorCode;
  }
}

export class InternalServerError extends BaseError {
  constructor({
    message,
    action,
    statusCode,
    errorLocationCode,
  }: Partial<BaseErrorModel>) {
    super({
      name: 'InternalServerError',
      message: message || 'Um erro interno não esperado aconteceu.',
      action: action || 'Informe ao suporte o valor encontrado no campo.',
      statusCode: statusCode || 500,
      errorLocationCode: errorLocationCode,
    });
  }
}

export class NotFoundError extends BaseError {
  constructor({
    message,
    action,
    errorLocationCode,
    key,
  }: Partial<BaseErrorModel>) {
    super({
      name: 'NotFoundError',
      message: message || 'Não foi possível encontrar este recurso no sistema.',
      action: action || 'Verifique se o caminho (PATH) está correto.',
      statusCode: 404,
      errorLocationCode: errorLocationCode,
      key: key,
    });
  }
}

export class ServiceError extends BaseError {
  constructor({
    message,
    action,
    context,
    statusCode,
    errorLocationCode,
    databaseErrorCode,
  }: Partial<BaseErrorModel>) {
    super({
      name: 'ServiceError',
      message: message || 'Serviço indisponível no momento.',
      action: action || 'Verifique se o serviço está disponível.',
      statusCode: statusCode || 503,
      context: context,
      errorLocationCode: errorLocationCode,
      databaseErrorCode: databaseErrorCode,
    });
  }
}

export class ValidationError extends BaseError {
  constructor({ message, action, statusCode, key }: Partial<BaseErrorModel>) {
    super({
      name: 'ValidationError',
      message: message || 'Um erro de validação ocorreu.',
      action: action || 'Ajuste os dados enviados e tente novamente.',
      statusCode: statusCode || 400,
      key: key,
    });
  }
}

export class UnauthorizedError extends BaseError {
  constructor({ message, action }: Partial<BaseErrorModel>) {
    super({
      name: 'UnauthorizedError',
      message: message || 'Usuário não autenticado.',
      action:
        action ||
        'Verifique se você está autenticado com uma sessão ativa e tente novamente.',
      statusCode: 401,
    });
  }
}

export class ForbiddenError extends BaseError {
  constructor({ message, action }: Partial<BaseErrorModel>) {
    super({
      name: 'ForbiddenError',
      message: message || 'Você não possui permissão para executar esta ação.',
      action:
        action || 'Verifique se você possui permissão para executar esta ação.',
      statusCode: 403,
    });
  }
}

export class MethodNotAllowedError extends BaseError {
  constructor({ message, action }: Partial<BaseErrorModel>) {
    super({
      name: 'MethodNotAllowedError',
      message: message || 'Método não permitido para este recurso.',
      action:
        action ||
        'Verifique se o método HTTP utilizado é válido para este recurso.',
      statusCode: 405,
    });
  }
}
