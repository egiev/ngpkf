import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IssueServiceTokenRequest } from '@/api-key/application/request/issue-service-token.request';
import { ServiceAccountRepositoryPort } from '@/api-key/domain/ports/service-account.repository.port';
import { ServiceAccount } from '@/api-key/domain/types/service-account.type';
import { AuthTokenVO } from '@/common/auth/domain/value-objects/auth-token.vo';
import { UseCase } from '@/common/ddd';
import { TokenPort } from '@/common/helpers/ports/token.port';

@Injectable()
export class IssueServiceTokenUseCase implements UseCase<IssueServiceTokenRequest, AuthTokenVO> {
  constructor(
    private readonly serviceAccountRepository: ServiceAccountRepositoryPort,
    private readonly tokenService: TokenPort,
  ) {}

  public async validateServiceAccount(clientId: string, apiKey: string): Promise<ServiceAccount> {
    const account = await this.serviceAccountRepository.findByClientId(clientId);

    if (!account || !account.isActive) {
      throw new UnauthorizedException('Invalid client credentials');
    }

    const isMatched = apiKey === account.apiKeyHash;

    if (!isMatched) {
      throw new UnauthorizedException('Invalid client credentials');
    }

    return account;
  }

  public async generateTokenFromValidatedAccount(account: ServiceAccount): Promise<AuthTokenVO> {
    const payload = {
      sub: account.id,
      clientId: account.clientId,
    };

    const token = await this.tokenService.signAccessToken(payload);

    return AuthTokenVO.create(token);
  }

  async execute(params: IssueServiceTokenRequest): Promise<AuthTokenVO> {
    const account = await this.validateServiceAccount(params.clientId, params.apiKey);
    return this.generateTokenFromValidatedAccount(account);
  }
}
