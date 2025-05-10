import { Provider } from '@nestjs/common';
import { LocalStorage } from '@core/abstracts';
import { LocalStorageAdapter } from '@application/adapters';
import { UploadFileCase } from '@application/use-cases';
import { LocalStorageService } from './local-storage.service';

export const localStorageProvider: Provider[] = [
  { provide: LocalStorage, useClass: LocalStorageService },
  {
    provide: UploadFileCase,
    useFactory: (localStorage: LocalStorage) =>
      new UploadFileCase(localStorage),
    inject: [LocalStorage],
  },
  {
    provide: LocalStorageAdapter,
    useFactory: (uploadFileCase: UploadFileCase) =>
      new LocalStorageAdapter(uploadFileCase),
    inject: [UploadFileCase],
  },
];
