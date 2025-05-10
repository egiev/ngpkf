import { Module } from '@nestjs/common';
import { LocalStorageModule } from './local-storage/local-storage.module';

@Module({
  providers: [LocalStorageModule],
  exports: [LocalStorageModule],
})
export class FileStorageModule {}
