import { AddUserModel, UserModel } from '@/domain/models/users';
import { UsersRepository } from '@/domain/repositories/users-repository';
import { prismaHelper } from '..';

export class UsersPrismaRepository implements UsersRepository {
  async add(user: AddUserModel): Promise<Omit<UserModel, 'password'>> {
    const now = new Date();

    const userCreated = await prismaHelper.user.create({
      data: {
        ...user,
        createdAt: now,
        updatedAt: now,
      },
    });

    Reflect.deleteProperty(userCreated, 'password');
    return userCreated;
  }

  async loadByEmail(email: string): Promise<UserModel | null> {
    return await prismaHelper.user.findUnique({
      where: { email },
    });
  }
}
