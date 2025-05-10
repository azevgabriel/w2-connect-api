export interface UserJwtPayload {
  id: string;
  email: string;
}

type Unit = 'Y' | 'W' | 'D' | 'H' | 'M' | 's' | 'Ms';

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

export interface TokenHelperProtocols {
  generateToken: (user: UserJwtPayload, expiresIn: StringValue) => string;
  verifyToken: (token: string) => Promise<UserJwtPayload>;
}
