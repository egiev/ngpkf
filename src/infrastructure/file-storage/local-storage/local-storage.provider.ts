import { Provider } from '@nestjs/common';
import { LocalStorage } from '@core/abstracts';
import { DownloadFileCase, UploadFileCase } from '@application/use-cases';
import { createUseCaseProvider } from '@shared/utils';
import { LocalStorageService } from './local-storage.service';

export const localStorageProvider: Provider[] = [
  { provide: LocalStorage, useClass: LocalStorageService },
  createUseCaseProvider(UploadFileCase, [LocalStorage]),
  createUseCaseProvider(DownloadFileCase, [LocalStorage]),
];
