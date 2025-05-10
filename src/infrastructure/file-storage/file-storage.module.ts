import { Module } from '@nestjs/common';
import { LocalStorageModule } from './local-storage';

@Module({
  imports: [LocalStorageModule],
  exports: [LocalStorageModule],
})
export class FileStorageModule {}
