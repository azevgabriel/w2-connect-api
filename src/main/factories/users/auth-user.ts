import { AuthUserController } from '@/controllers/users/auth-user/auth-user';
import { UsersPrismaRepository } from '@/infra/prisma/users/users-prisma-repository';
import { EncryptHelper } from '@/services/helpers/encrypt';
import { TokenHelper } from '@/services/helpers/token';
import { AuthUserUseCase } from '@/services/use-cases/users/auth-user';

export const makeAuthUser = (): AuthUserController => {
  return new AuthUserController(
    new AuthUserUseCase(
      new UsersPrismaRepository(),
      new EncryptHelper(8),
      new TokenHelper()
    )
  );
};
