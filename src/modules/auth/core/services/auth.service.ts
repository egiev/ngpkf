import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { refreshJwtConfig } from '@/config';
import { JwtPayload } from '@/modules/auth/core/payloads';
import { AuthCredentialsType } from '@/modules/auth/core/types';
import { extractPermissions } from '@/modules/auth/core/utils';
import { UserEntity } from '@/modules/user/core/entities';
import { UserService } from '@/modules/user/core/services';
import { HelperHashService } from '../../../../common/helpers/services/helper.hash.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private readonly helperHashService: HelperHashService,
  ) {}

  async loginWithCredentials(credentials: AuthCredentialsType) {
    this.logger.log(`Logging in user: ${credentials.username}`);
    const user = await this.validateCredentials(credentials);
    return this.createToken(user);
  }

  async refreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, this.refreshJwtConfiguration);
      const user = await this.userService.getUser({ id: payload.sub });
      if (!user) throw new BadRequestException('Invalid token');
      return this.createToken(user);
    } catch {
      throw new BadRequestException('Invalid token');
    }
  }

  async validateCredentials(credentials: AuthCredentialsType) {
    const user = await this.userService.getUser({
      username: credentials.username,
    });
    if (!user) throw new BadRequestException('Invalid credentials');
    const isMatch = await this.helperHashService.compare(credentials.password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');
    return user;
  }

  private async createToken(user: UserEntity) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      permissions: extractPermissions(user),
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, this.refreshJwtConfiguration);

    return {
      user,
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }
}
