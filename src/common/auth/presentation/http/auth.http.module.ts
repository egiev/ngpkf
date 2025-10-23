import { Module } from '@nestjs/common';
import { AuthModule } from '@/common/auth/auth.module';
import { AuthHttpController } from '@/common/auth/presentation/http/auth.http.controller';

@Module({ imports: [AuthModule], controllers: [AuthHttpController] })
export class AuthHttpModule {}
