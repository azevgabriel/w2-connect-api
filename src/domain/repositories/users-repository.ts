import { AddUserModel, UserModel } from '@/domain/models/users';

export interface UsersRepository {
  addUser: (user: AddUserModel) => Promise<UserModel>;
}
