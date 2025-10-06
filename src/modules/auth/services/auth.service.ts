import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { refreshJwtConfig } from '@/config';
import { AuthLoginDTO } from '@/modules/auth/dtos';
import { JwtPayload } from '@/modules/auth/payloads';
import { extractPermissions } from '@/modules/auth/utils';
import { UserEntity } from '@/modules/user/entities';
import { UserRepository } from '@/modules/user/repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async loginWithCredentials(credentials: AuthLoginDTO) {
    const user = await this.validateCredentials(credentials);
    return this.createToken(user);
  }

  async refreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, this.refreshJwtConfiguration);
      const user = await this.userRepository.findOne({ id: payload.sub });
      if (!user) throw new BadRequestException('Invalid token');
      return this.createToken(user);
    } catch {
      throw new BadRequestException('Invalid token');
    }
  }

  async validateCredentials(credentials: AuthLoginDTO) {
    const user = await this.userRepository.findOne({
      username: credentials.username,
    });
    if (!user) throw new BadRequestException('Invalid credentials');
    const isMatch = await bcrypt.compare(credentials.password, user.password);
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
