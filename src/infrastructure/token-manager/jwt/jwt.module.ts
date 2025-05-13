import { Module } from '@nestjs/common';
import { jwtProvider } from './jwt.provider';

@Module({
  providers: [...jwtProvider],
  exports: [...jwtProvider],
})
export class JwtModule {}
