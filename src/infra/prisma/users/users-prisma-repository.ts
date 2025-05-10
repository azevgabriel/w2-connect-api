import { AddUserModel, UserModel } from '@/domain/models/users';
import { UsersRepository } from '@/domain/repositories/users-repository';
import { prismaHelper } from '..';

export class UsersPrismaRepository implements UsersRepository {
  async add(user: AddUserModel): Promise<UserModel> {
    return await prismaHelper.user.create(user);
  }

  async loadByEmail(email: string): Promise<UserModel | null> {
    return await prismaHelper.user.findUnique({
      where: { email },
    });
  }
}
