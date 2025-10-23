import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@/common/auth/domain/types/jwt-payload.type';
import { jwtConfig } from '@/configs';
import { UserRepositoryPort } from '@/iam/user/domain/ports';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly userRepository: UserRepositoryPort,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret!,
    });
  }

  async validate(payload: JwtPayload) {
    // Ensure user still exist and active
    const user = await this.userRepository.getOneById(payload.sub);

    if (!user) {
      // TODO: Create exception
      throw new Error('User does not exist or account is inactive');
    }

    return payload;
  }
}
