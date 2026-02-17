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

  adminContext.componentLoader.override('SidebarResourceSection', './admin/ui/components/sidebar.component.jsx');

  const adminJs = new AdminJS({
    rootPath: `${process.env.PROJECT_BASE_PATH}/admin`,
    loginPath: `${process.env.PROJECT_BASE_PATH}/admin/login`,
    logoutPath: `${process.env.PROJECT_BASE_PATH}/admin/logout`,
    branding: {
      companyName: 'Company Name',
      favicon: `${process.env.PROJECT_BASE_PATH}/favicon.ico`,
      logo: `${process.env.PROJECT_BASE_PATH}/assets/logo.png`,
    },
    dashboard: {
      component: adminContext.componentLoader.add('Dashboard', './admin/ui/pages/dashboard.page.jsx'),
    },
    componentLoader: adminContext.componentLoader,
    resources,
    locale: {
      language: 'en',
      availableLanguages: ['en'],
      translations: {
        en: {
          labels: {
            AuthUserEntity: 'Users',
            AuthGroupEntity: 'Groups',
            AuthPermissionEntity: 'Permissions',
            ServiceAccountEntity: 'Service Accounts',
          },
        },
      },
    },
  });

  if (process.env.NODE_ENV === 'local') await adminJs.watch();
  else await adminJs.initialize();

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, auth, null, sessionStore);

  app.use(adminJs.options.rootPath, adminRouter);
}
