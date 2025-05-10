import { AddUserModel, UserModel } from '@/domain/models/users';

export interface AddUserServiceProtocols {
  add: (user: AddUserModel) => Promise<Omit<UserModel, 'password'>>;
}
