import { UserJwtPayload } from '../../helpers/token.protocols';

export interface AuthUserUseCaseProtocols {
  auth: (
    email: string,
    password: string
  ) => Promise<{
    token: string;
    user: UserJwtPayload;
  }>;
}
