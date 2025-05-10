import { EncryptHelperProtocols } from '@/domain/services/helpers/encrypt.procotols';
import { compare, hash } from 'bcryptjs';

export class EncryptHelper implements EncryptHelperProtocols {
  #salt: number;

  constructor(salt: number) {
    this.#salt = salt;
  }

  async encrypt(password: string): Promise<string> {
    return hash(password, this.#salt);
  }

  async compare(password: string, passwordEncrypted: string): Promise<boolean> {
    return await compare(password, passwordEncrypted);
  }
}
