import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepositoryPort } from '@/auth-user/domain/ports';
import { JwtPayload } from '@/auth/domain/types';
import { jwtConfig } from '@/configs';

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

  validate(payload: JwtPayload) {
    // TODO: validate if service account or users still exist
    // Ensure user still exist and active
    // const user = await this.userRepository.getOneById(payload.sub);

    // if (!user) {
    //   // TODO: Create exception
    //   throw new Error('User does not exist or account is inactive');
    // }

    return payload;
  }
}
