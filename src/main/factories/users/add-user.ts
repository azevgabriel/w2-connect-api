import { AddUserController } from '@/controllers/users/add-user/add-user';
import { UsersPrismaRepository } from '@/infra/prisma/users/users-prisma-repository';
import { EncryptHelper } from '@/services/helpers/encrypt';
import { AddUserUseCase } from '@/services/use-cases/users/add-user';

export const makeAddUser = (): AddUserController => {
  return new AddUserController(
    new AddUserUseCase(new UsersPrismaRepository(), new EncryptHelper(8))
  );
};
