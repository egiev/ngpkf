import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginWithCredentialsUseCase } from '@/auth/application/login-with-credentials.use-case';
import { AuthSerialization } from '@/auth/presentation/auth.serialization';
import { Public } from '@/auth/presentation/decorators/public.decorator';
import { AuthCredentialsDTO, RefreshTokenDTO } from '@/auth/presentation/http/dtos';
import { Response } from '@/common/response/decorators';
import { RefreshTokenUseCase } from '../../application/refresh-token.use-case';

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class AuthHttpController {
  constructor(
    private readonly loginWithCredentialsUseCase: LoginWithCredentialsUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Public()
  @Response({ serialization: AuthSerialization })
  @Post('login')
  async login(@Body() dto: AuthCredentialsDTO) {
    return await this.loginWithCredentialsUseCase.execute(dto);
  }

  @Public()
  @Response({ serialization: AuthSerialization })
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDTO) {
    return await this.refreshTokenUseCase.execute(dto);
  }
}
