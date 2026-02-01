import { AdminContext, AdminUser } from '@/admin/common/types';
import { ActionResponse, BaseRecord, ResourceOptions } from 'adminjs';

export function actions(context: AdminContext): ResourceOptions['actions'] {
  const {
    services: { hashingService },
  } = context;

  return {
    list: {
      isAccessible: ({ currentAdmin }) => {
        const adminUser = currentAdmin as AdminUser;
        return adminUser.isSuperUser;
      },
    },
    new: {
      before: async (request) => {
        if (request.payload?.passwordHash) {
          request.payload.passwordHash = await hashingService.hash(request.payload.passwordHash as string);
        }
        return request;
      },
    },
    edit: {
      before: async (request) => {
        if (request.method === 'post') {
          if (request.payload?.passwordHash) {
            request.payload.passwordHash = await hashingService.hash(request.payload.passwordHash as string);
          } else {
            delete request.payload?.passwordHash;
          }
        }
        return request;
      },
      after: (response: ActionResponse): ActionResponse => {
        const record = response.record as BaseRecord;

        if (record && record.params) {
          record.params.passwordHash = undefined;
        }
        return response;
      },
    },
  };
}
