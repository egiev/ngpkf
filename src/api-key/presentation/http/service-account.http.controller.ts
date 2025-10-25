import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ServiceAccount } from '@/api-key/domain/types/service-account.type';
import { ServiceAuthGuard } from '@/api-key/presentation/guards/service-auth.guard';
import { AuthSerialization } from '@/common/auth/presentation/auth.serialization';
import { Public } from '@/common/auth/presentation/decorators/public.decorator';
import { Response } from '@/common/response/decorators';
import { IssueServiceTokenUseCase } from '../../application/issue-service-token.use-case';

@Controller({
  path: 'auth/service',
})
export class ServiceAuthHttpController {
  constructor(private readonly issueServiceTokenUseCase: IssueServiceTokenUseCase) {}

  @Public()
  @UseGuards(ServiceAuthGuard)
  @Response({ serialization: AuthSerialization })
  @Post('token')
  async issueToken(@Req() request: Request) {
    const user = request['user'] as ServiceAccount;
    return await this.issueServiceTokenUseCase.generateTokenFromValidatedAccount(user);
  }
}
