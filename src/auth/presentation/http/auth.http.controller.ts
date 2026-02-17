import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginWithCredentialsUseCase, RefreshTokenUseCase } from '@/auth/application';
import { AuthSerialization } from '@/auth/presentation';
import { AuthCredentialsDTO, RefreshTokenDTO } from '@/auth/presentation/http/dtos';
import { Public } from '@/common/decorators';
import { Response } from '@/common/response/decorators';

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

  @Public()
  @Post('logout')
  logout() {
    return true;
  }
}
