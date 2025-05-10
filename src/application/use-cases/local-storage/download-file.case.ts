import { LocalStorage, UseCase } from '@core/abstracts';

export class DownloadFileCase implements UseCase<any, any> {
  constructor(private readonly localStorage: LocalStorage) {}

  async execute({ filename, token, res }: any): Promise<any> {
    return await this.localStorage.download(filename, token, res);
  }
}
