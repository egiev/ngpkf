import { INestApplication } from '@nestjs/common';
import { createAuthAdmin } from '@/admin/auth';
import { buildAdminContext } from '@/admin/contexts';
import { createResources } from '@/admin/resources';
import { createSessionStore } from '@/admin/store';

export default async function (app: INestApplication) {
  const adminJSModule = await import('adminjs');
  const AdminJS = adminJSModule.default;

  const adminJSExpressModule = await import('@adminjs/express');
  const AdminJSExpress = adminJSExpressModule.default;

  const { Database, Resource } = await import('@adminjs/mikroorm');
  AdminJS.registerAdapter({ Database, Resource });

  const adminContext = await buildAdminContext(app);

  const resources = createResources(adminContext);
  const auth = createAuthAdmin(adminContext);
  const sessionStore = createSessionStore(adminContext);

  const adminJs = new AdminJS({
    rootPath: '/admin',
    branding: {
      companyName: 'Company Name',
    },
    componentLoader: adminContext.componentLoader,
    resources,
  });
  await adminJs.watch();

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, auth, null, sessionStore);

  app.use(adminJs.options.rootPath, adminRouter);
}
