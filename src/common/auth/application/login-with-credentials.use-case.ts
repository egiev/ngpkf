import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginWithCredentialsRequest } from '@/common/auth/application/requests/login-with-credentials.request';
import { JwtPayload } from '@/common/auth/domain/types/jwt-payload.type';
import { AuthTokenVO } from '@/common/auth/domain/value-objects/auth-token.vo';
import { UseCase } from '@/common/ddd';
import { HashingPort } from '@/common/helpers/ports';
import { TokenPort } from '@/common/helpers/ports/token.port';
import { User } from '@/iam/user/domain/entities';
import { UserRepositoryPort } from '@/iam/user/domain/ports';

@Injectable()
export class LoginWithCredentialsUseCase implements UseCase<LoginWithCredentialsRequest, AuthTokenVO> {
  private readonly logger = new Logger(LoginWithCredentialsUseCase.name);

  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly tokenService: TokenPort,
    private readonly hashingService: HashingPort,
  ) {}

  public async authenticateUser(username: string, password: string): Promise<User> {
    this.logger.log(`Logging in user ${username}`);

    const user = await this.userRepository.getOneByUsername(username);

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
