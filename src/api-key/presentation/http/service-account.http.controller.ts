import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { IssueServiceTokenUseCase } from '@/api-key/application';
import { ServiceAccount } from '@/api-key/domain/types';
import { AuthSerialization } from '@/auth/presentation';
import { Public } from '@/common/decorators';
import { ServiceAuthGuard } from '@/common/guards';
import { Response } from '@/common/response/decorators';

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
