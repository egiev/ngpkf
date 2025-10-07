import { Module } from '@nestjs/common';
import { AuthCoreModule } from '@/modules/auth/core';
import { AuthController } from './auth.controller';

@Module({ imports: [AuthCoreModule], controllers: [AuthController] })
export class AuthHttpModule {}
