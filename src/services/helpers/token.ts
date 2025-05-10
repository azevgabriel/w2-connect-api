import {
  StringValue,
  TokenHelperProtocols,
  UserJwtPayload,
} from '@/domain/services/helpers/token.protocols';
import { UnauthorizedError } from '@/main/presentation/errors';
import { sign, verify } from 'jsonwebtoken';

export class TokenHelper implements TokenHelperProtocols {
  #MD5: string;

  constructor() {
    if (!process?.env?.DEFAULT_USER_HASH)
      throw new Error('DEFAULT_USER_HASH not defined');

    this.#MD5 = process.env.DEFAULT_USER_HASH;
  }

  generateToken(user: UserJwtPayload, expiresIn: StringValue): string {
    const userStringify = JSON.stringify(user);

    return sign(userStringify, this.#MD5, {
      expiresIn,
    });
  }

  async verifyToken(token: string): Promise<UserJwtPayload> {
    const { sub } = verify(token, this.#MD5);

    const data =
      typeof sub === 'string' ? (JSON.parse(sub) as UserJwtPayload) : undefined;

    if (!data)
      throw new UnauthorizedError({
        message: 'Invalid token',
        name: 'TokenError',
      });

    return data;
  }
}
