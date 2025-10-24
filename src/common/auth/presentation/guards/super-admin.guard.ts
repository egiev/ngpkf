import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from '@/common/auth/domain/types/jwt-payload.type';

@Injectable()
export class SuperUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest(context) as Request & { user: JwtPayload };
    const user = request.user;

    if (user && user.isSuperUser) return true;

    return false;
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest<Request>();
    }

    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<{ req: Request }>().req;
  }
}
