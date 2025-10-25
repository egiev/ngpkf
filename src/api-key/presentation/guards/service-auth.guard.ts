import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IssueServiceTokenUseCase } from '@/api-key/application/issue-service-token.use-case';

@Injectable()
export class ServiceAuthGuard implements CanActivate {
  constructor(private readonly issueServiceTokenUseCase: IssueServiceTokenUseCase) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);

    const clientId = request.headers['x-client-id'] as string;
    const apiKey = request.headers['x-api-key'] as string;

    if (!clientId && !apiKey) {
      throw new UnauthorizedException('Invalid client credentials');
    }

    try {
      const account = await this.issueServiceTokenUseCase.validateServiceAccount(clientId, apiKey);

      request['user'] = account;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid client credentials');
    }
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest<Request>();
    }

    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<{ req: Request }>().req;
  }
}
