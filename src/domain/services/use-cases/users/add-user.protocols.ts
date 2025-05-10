import { AddUserModel, UserModel } from '@/domain/models/users';

export interface AddUserUseCaseProtocols {
  add: (user: AddUserModel) => Promise<Omit<UserModel, 'password'>>;
}
