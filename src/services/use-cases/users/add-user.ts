import { AddUserModel, UserModel } from '@/domain/models/users';
import { UsersRepository } from '@/domain/repositories/users-repository';
import { AddUserUseCaseProtocols } from '@/domain/services/use-cases/users/add-user.protocols';
import { ValidationError } from '@/main/presentation/errors';
import { EncryptHelper } from '@/services/helpers/encrypt';

export class AddUserUseCase implements AddUserUseCaseProtocols {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly encryptHelper: EncryptHelper
  ) {}

  async add(user: AddUserModel): Promise<Omit<UserModel, 'password'>> {
    const userExists = await this.userRepository.loadByEmail(user.email);

    if (userExists)
      throw new ValidationError({
        message: "User's email already exists.",
        action: 'The email is already registered.',
        statusCode: 400,
        key: 'email',
      });

    const passwordEncrypted = await this.encryptHelper.encrypt(user.password);

    const userCreated = await this.userRepository.add({
      ...user,
      password: passwordEncrypted,
    });

    return userCreated;
  }
}
