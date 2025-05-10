import { UserModel } from '@/domain/models/users';
import { UsersRepository } from '@/domain/repositories/users-repository';
import { EncryptHelperProtocols } from '@/domain/services/helpers/encrypt.procotols';
import { TokenHelperProtocols } from '@/domain/services/helpers/token.protocols';
import { AuthUserUseCaseProtocols } from '@/domain/services/use-cases/users/auth-user.protocols';
import { UnauthorizedError } from '@/main/presentation/errors';

export class AuthUserUseCase implements AuthUserUseCaseProtocols {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly encryptHelper: EncryptHelperProtocols,
    private readonly tokenHelper: TokenHelperProtocols
  ) {}

  async auth(
    email: string,
    password: string
  ): Promise<{
    token: string;
    user: Omit<UserModel, 'password'>;
  }> {
    const userExists = await this.userRepository.loadByEmail(email);

    if (!userExists)
      throw new UnauthorizedError({
        action: 'The email or password is incorrect.',
      });

    const passwordIsValid = await this.encryptHelper.compare(
      password,
      userExists.password
    );

    if (!passwordIsValid)
      throw new UnauthorizedError({
        action: 'The email or password is incorrect.',
      });

    Reflect.deleteProperty(userExists, 'password');

    const token = this.tokenHelper.generateToken(
      {
        id: userExists.id,
        email: userExists.email,
      },
      '1D'
    );

    return {
      token,
      user: userExists,
    };
  }
}
