import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthUser } from '@/auth-user/domain/entities';
import { AuthUserRepositoryPort } from '@/auth-user/domain/ports';
import { LoginWithCredentialsRequest } from '@/auth/application/requests';
import { JwtPayload } from '@/auth/domain/types';
import { AuthTokenVO } from '@/auth/domain/value-objects';
import { UseCase } from '@/common/ddd';
import { HashingPort, TokenPort } from '@/common/helpers/ports';

@Injectable()
export class LoginWithCredentialsUseCase implements UseCase<LoginWithCredentialsRequest, AuthTokenVO> {
  private readonly logger = new Logger(LoginWithCredentialsUseCase.name);

  constructor(
    private readonly authUserRepository: AuthUserRepositoryPort,
    private readonly tokenService: TokenPort,
    private readonly hashingService: HashingPort,
  ) {}

  public async authenticateUser(username: string, password: string): Promise<AuthUser> {
    this.logger.log(`Logging in user ${username}`);

    const user = await this.authUserRepository.getOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isMatch = await this.hashingService.compare(password, user.getPasswordHash());

    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }

  async execute(params: LoginWithCredentialsRequest): Promise<AuthTokenVO> {
    const { username, password } = params;
    const user = await this.authenticateUser(username, password);

    const payload: JwtPayload = {
      sub: user.getId(),
      username: user.getUsername(),
      permissions: user.getAggregatedPermissions(),
      isSuperUser: user.getIsSuperUser(),
    };

    const token = await this.tokenService.signAccessToken(payload);

    return AuthTokenVO.create(token);
  }
}
