import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms, { StringValue } from 'ms';
import { TokenPort } from '@/common/auth/domain/ports/token.port';
import { JwtPayload } from '@/common/auth/domain/types/jwt-payload.type';
import { AuthTokenVO } from '@/common/auth/domain/value-objects/auth-token.vo';
import { jwtConfig, refreshJwtConfig } from '@/configs';
import { User } from '@/iam/user/domain/entities';

@Injectable()
export class JwtTokenAdapter implements TokenPort {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtConfigConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async createToken(user: User): Promise<AuthTokenVO> {
    const payload: JwtPayload = {
      sub: user.getId(),
      username: user.getUsername(),
      permissions: user.getAggregatedPermissions(),
      isSuperUser: user.getIsSuperUser(),
    };

    const accessToken = await this.jwtService.signAsync({ ...payload });
    const refreshToken = await this.jwtService.signAsync({ ...payload }, this.refreshJwtConfiguration);
    const expiresIn = this.getAccessTokenExpiresInSeconds();
    const expirationTimestamp = this.getCurrentUnixTimestamp() + expiresIn;

    return AuthTokenVO.create({ accessToken, refreshToken, expiresIn, expirationTimestamp });
  }

  async refreshToken(token: string): Promise<AuthTokenVO> {
    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token, this.refreshJwtConfiguration);
    } catch {
      throw new Error('Invalid or expired refresh token');
    }

    const refreshPayload: JwtPayload = {
      sub: payload.sub,
      username: payload.username,
      permissions: payload.permissions,
      isSuperUser: payload.isSuperUser,
    };

    const accessToken = await this.jwtService.signAsync({ ...refreshPayload });
    const refreshToken = await this.jwtService.signAsync({ ...refreshPayload }, this.refreshJwtConfiguration);
    const expiresIn = this.getAccessTokenExpiresInSeconds();
    const expirationTimestamp = this.getCurrentUnixTimestamp() + expiresIn;

    return AuthTokenVO.create({ accessToken, refreshToken, expiresIn, expirationTimestamp });
  }

  private getAccessTokenExpiresInSeconds(): number {
    const expiry = this.jwtConfigConfiguration.signOptions.expiresIn as StringValue;

    const milliseconds = ms(expiry);

    if (milliseconds === undefined || milliseconds === null) {
      throw new Error('Invalid time string provided');
    }

    return Math.floor(milliseconds / 1000);
  }

  private getCurrentUnixTimestamp(): number {
    return Math.floor(new Date().getTime() / 1000);
  }
}
