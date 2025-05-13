import { Module } from '@nestjs/common';
import { JwtModule } from './jwt';

@Module({
  imports: [JwtModule],
  exports: [JwtModule],
})
export class TokenManagerModule {}
