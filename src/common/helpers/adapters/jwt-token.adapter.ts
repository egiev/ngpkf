import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { Token, TokenPort } from '@/common/helpers/ports';
import { jwtConfig, refreshJwtConfig } from '@/configs';

@Injectable()
export class JwtTokenAdapter implements TokenPort {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtConfigConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async signAccessToken(payload: object): Promise<Token> {
    const accessToken = await this.jwtService.signAsync({ ...payload });
    const refreshToken = await this.jwtService.signAsync({ ...payload }, this.refreshJwtConfiguration);
    const expiresIn = this.getAccessTokenExpiresInSeconds();
    const expirationTimestamp = this.getCurrentUnixTimestamp() + expiresIn;

    return { accessToken, refreshToken, expiresIn, expirationTimestamp };
  }

  async refreshToken(token: string): Promise<Token> {
    let payload: object;

    try {
      payload = await this.jwtService.verifyAsync(token, this.refreshJwtConfiguration);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const refreshPayload = { ...payload };
    delete refreshPayload['iat'];
    delete refreshPayload['exp'];

    const accessToken = await this.jwtService.signAsync({ ...refreshPayload });
    const refreshToken = await this.jwtService.signAsync({ ...refreshPayload }, this.refreshJwtConfiguration);
    const expiresIn = this.getAccessTokenExpiresInSeconds();
    const expirationTimestamp = this.getCurrentUnixTimestamp() + expiresIn;

    return { accessToken, refreshToken, expiresIn, expirationTimestamp };
  }

  async verify(token: string): Promise<Token> {
    try {
      return await this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private getAccessTokenExpiresInSeconds(): number {
    const expiry = this.jwtConfigConfiguration.signOptions.expiresIn;

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
