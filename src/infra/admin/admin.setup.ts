/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
import { INestApplication } from '@nestjs/common';
import { createAuthAdmin } from '@/infra/admin/admin.auth';
import { dynamicImport } from '@/infra/admin/utils';

export default async function (app: INestApplication) {
  const adminJSModule = await dynamicImport('adminjs');
  const AdminJS = adminJSModule.default;

  const adminJsExpress = await dynamicImport('@adminjs/express');
  const AdminJSExpress = adminJsExpress.default;

  const { Database, Resource } = await dynamicImport('@adminjs/mikroorm');
  AdminJS.registerAdapter({ Database, Resource });

  const auth = createAuthAdmin();

  const adminJs = new AdminJS({
    rootPath: '/admin',
    branding: {
      companyName: 'Reginald Mabanta',
    },
    resources: [],
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, auth);
  app.use(adminJs.options.rootPath, adminRouter);
}
