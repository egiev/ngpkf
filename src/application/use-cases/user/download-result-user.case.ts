import { LocalStorage, TokenManager, UseCase } from '@core/abstracts';

export class DownloadResultUserCase implements UseCase<any, string> {
  constructor(
    private readonly tokenManager: TokenManager,
    private readonly localStorage: LocalStorage,
  ) {}

  async execute({ filename, token }: any): Promise<string> {
    const payload = this.tokenManager.verify(token);

    const isExist = await this.localStorage.isExists(filename);
    if (!isExist) throw new Error('File not found');

    const filepath = await this.localStorage.getFilePath(filename);

    return filepath;
  }
}
