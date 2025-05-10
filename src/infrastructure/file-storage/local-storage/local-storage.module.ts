import { Module } from '@nestjs/common';
import { LocalStorageAdapter } from '@application/adapters';
import { localStorageProvider } from './local-storage.provider';

@Module({
  providers: [...localStorageProvider],
  exports: [LocalStorageAdapter],
})
export class LocalStorageModule {}
