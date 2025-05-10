import { LocalStorage, UseCase } from '@core/abstracts';

export type UploadFileParams = {
  buffer: Buffer;
  filename: string;
};

export class UploadFileCase implements UseCase<UploadFileParams, any> {
  constructor(private readonly localStorage: LocalStorage) {}

  execute(params: UploadFileParams): Promise<any> {
    return this.localStorage.upload(params.buffer, params.filename);
  }
}
