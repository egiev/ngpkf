import { Provider } from '@nestjs/common';
import { LocalStorage } from '@core/abstracts';
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
];
