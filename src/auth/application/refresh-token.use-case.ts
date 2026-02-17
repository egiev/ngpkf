import { Injectable } from '@nestjs/common';
import { RefreshTokenRequest } from '@/auth/application/requests';
import { UseCase } from '@/common/ddd';
import { TokenPort } from '@/common/helpers/ports';
import { RefreshTokenResponse } from './response';

@Injectable()
export class RefreshTokenUseCase implements UseCase<RefreshTokenRequest, RefreshTokenResponse> {
  constructor(private readonly tokenService: TokenPort) {}

  async execute(params: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const token = await this.tokenService.refreshToken(params.refreshToken);
    return token;
  }
}
