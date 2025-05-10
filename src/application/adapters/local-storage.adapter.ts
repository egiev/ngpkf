import { UploadFileCase, UploadFileParams } from '../use-cases';

export class LocalStorageAdapter {
  constructor(private readonly uploadFileCase: UploadFileCase) {}

  upload(param: UploadFileParams) {
    return this.uploadFileCase.execute(param);
  }
}
