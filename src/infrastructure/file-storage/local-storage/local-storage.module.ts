import { Module } from '@nestjs/common';
import { localStorageProvider } from './local-storage.provider';

@Module({
  providers: [...localStorageProvider],
  exports: [...localStorageProvider],
})
export class LocalStorageModule {}
