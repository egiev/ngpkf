import { Module } from '@nestjs/common';
import { AuthUserModule } from '@/auth-user/auth-user.module';
import { AuthUserHttpController } from './user.http.controller';

@Module({ imports: [AuthUserModule], controllers: [AuthUserHttpController] })
export class AuthUserHttpModule {}
