import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure';
import { UserConsumerService } from './user.consumer';
import { UserResolver } from './user.resolver';

@Module({
  imports: [InfrastructureModule],
  providers: [UserResolver, UserConsumerService],
})
export class UserModule {}
