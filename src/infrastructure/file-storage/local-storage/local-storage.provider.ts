import { Provider } from '@nestjs/common';
import { LocalStorage } from '@core/abstracts';
import { LocalStorageService } from './local-storage.service';

export const localStorageProvider: Provider[] = [
  { provide: LocalStorage, useClass: LocalStorageService },
];
