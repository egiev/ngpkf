import { Injectable } from '@nestjs/common';
import { RefreshTokenRequest } from '@/common/auth/application/requests/refresh-token.request';
import { AuthTokenVO } from '@/common/auth/domain/value-objects/auth-token.vo';
import { UseCase } from '@/common/ddd';
import { TokenPort } from '@/common/helpers/ports/token.port';

@Injectable()
export class RefreshTokenUseCase implements UseCase<RefreshTokenRequest, AuthTokenVO> {
  constructor(private readonly tokenService: TokenPort) {}

  async execute(params: RefreshTokenRequest): Promise<AuthTokenVO> {
    const token = await this.tokenService.refreshToken(params.refreshToken);
    return AuthTokenVO.create(token);
  }
}
