import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { AuthHttpController } from './auth.http.controller';

@Module({ imports: [AuthModule], controllers: [AuthHttpController] })
export class AuthHttpModule {}
