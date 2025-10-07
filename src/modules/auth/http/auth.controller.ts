import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/core/services';
import { AuthCredentialsDTO } from '@/modules/auth/http/dtos';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: AuthCredentialsDTO) {
    await this.authService.loginWithCredentials(credentials);
  }
}
