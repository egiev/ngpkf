import { Injectable } from '@nestjs/common';
import { RefreshTokenRequest } from '@/common/auth/application/requests/refresh-token.request';
import { TokenPort } from '@/common/auth/domain/ports/token.port';
import { AuthTokenVO } from '@/common/auth/domain/value-objects/auth-token.vo';
import { UseCase } from '@/common/ddd';

@Injectable()
export class RefreshTokenUseCase implements UseCase<RefreshTokenRequest, AuthTokenVO> {
  constructor(private readonly tokenService: TokenPort) {}

  async execute(params: RefreshTokenRequest): Promise<AuthTokenVO> {
    const token = await this.tokenService.refreshToken(params.refreshToken);
    return token;
  }
}
