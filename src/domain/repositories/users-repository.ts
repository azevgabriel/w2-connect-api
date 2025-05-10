import { AddUserModel, UserModel } from '@/domain/models/users';

export interface UsersRepository {
  add: (user: AddUserModel) => Promise<UserModel>;
  loadByEmail: (email: string) => Promise<UserModel | null>;
}
