import { Module } from '@nestjs/common';
import { AuthUserHttpModule } from '@/auth-user/presentation/http';
import { AuthHttpModule } from '@/auth/presentation/http';
import { TrainingServiceHttpModule } from '@/training-service/presentation/http';

@Module({
  imports: [AuthHttpModule, AuthUserHttpModule, TrainingServiceHttpModule],
  exports: [],
})
export class HttpApiModule {}
