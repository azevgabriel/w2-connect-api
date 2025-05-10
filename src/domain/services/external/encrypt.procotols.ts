export interface EncryptHelperProtocols {
  encrypt: (password: string) => Promise<string>;
  compare: (password: string, passwordEncrypted: string) => Promise<boolean>;
}
