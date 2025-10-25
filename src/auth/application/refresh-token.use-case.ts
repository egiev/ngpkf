import { Injectable } from '@nestjs/common';
import { RefreshTokenRequest } from '@/auth/application/requests';
import { AuthTokenVO } from '@/auth/domain/value-objects';
import { UseCase } from '@/common/ddd';
import { TokenPort } from '@/common/helpers/ports';

@Injectable()
export class RefreshTokenUseCase implements UseCase<RefreshTokenRequest, AuthTokenVO> {
  constructor(private readonly tokenService: TokenPort) {}

  async execute(params: RefreshTokenRequest): Promise<AuthTokenVO> {
    const token = await this.tokenService.refreshToken(params.refreshToken);
    return AuthTokenVO.create(token);
  }
}
