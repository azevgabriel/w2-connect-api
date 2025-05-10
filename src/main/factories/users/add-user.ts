import { AddUserController } from '@/controllers/users/add-user';
import { UsersPrismaRepository } from '@/infra/prisma/users/users-prisma-repository';
import { EncryptHelper } from '@/services/external/encrypt';
import { AddUserService } from '@/services/internal/users/add-user';

export const makeAddUser = (): AddUserController => {
  return new AddUserController(
    new AddUserService(new UsersPrismaRepository(), new EncryptHelper(8))
  );
};
