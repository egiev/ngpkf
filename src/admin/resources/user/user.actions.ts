import { ActionResponse, BaseRecord, ResourceOptions } from 'adminjs';
import { AdminContext } from '@/admin/common/types';

export function actions(context: AdminContext): ResourceOptions['actions'] {
  const {
    services: { hashingService },
  } = context;

  return {
    new: {
      before: async (request) => {
        if (request.payload?.password) {
          request.payload.password = await hashingService.hash(request.payload.password as string);
        }
        return request;
      },
    },
    edit: {
      before: async (request) => {
        if (request.method === 'post') {
          if (request.payload?.password) {
            request.payload.password = await hashingService.hash(request.payload.password as string);
          } else {
            delete request.payload?.password;
          }
        }
        return request;
      },
      after: (response: ActionResponse): ActionResponse => {
        const record = response.record as BaseRecord;

        if (record && record.params) {
          record.params.password = undefined;
        }
        return response;
      },
    },
  };
}
