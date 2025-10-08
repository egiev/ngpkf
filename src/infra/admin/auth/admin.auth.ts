import { RequestContext } from '@mikro-orm/core';
import { BadRequestException } from '@nestjs/common';
import { AdminContext } from '@/infra/admin/common/interfaces';

export function createAuthAdmin({ em, services: { authService, configService } }: AdminContext) {
  return {
    authenticate: async (email: string, password: string) => {
      try {
        return await RequestContext.create(em, async () => {
          const { user } = await authService.loginWithCredentials({
            username: email,
            password,
          });

          if (!user.isSuperUser && !user.isStaff) {
            throw new BadRequestException(
              'You are not authorized to access this resource. Please contact your administrator for assistance.',
            );
          }

          return { ...user, email: user.username };
        });
      } catch {
        throw new BadRequestException('Something went wrong. Please try again later.');
      }
    },
    cookieName: configService.get('ADMIN_COOKIE_NAME') as string,
    cookiePassword: configService.get('ADMIN_COOKIE_PASSWORD') as string,
  };
}
