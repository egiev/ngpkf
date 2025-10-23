import { Module } from '@nestjs/common';
import { HashingPort, IdGeneratorPort } from '@/common/helpers/ports';
import { BycryptHashingAdapter, UUIDGeneratorAdapter } from '@/infra/helpers/adapters';

@Module({
  providers: [
    { provide: IdGeneratorPort, useClass: UUIDGeneratorAdapter },
    { provide: HashingPort, useClass: BycryptHashingAdapter },
  ],
  exports: [IdGeneratorPort, HashingPort],
})
export class HelperModule {}
