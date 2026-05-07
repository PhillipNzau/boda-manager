import { Route } from '@angular/router';
import { Dashboard } from './dashboard';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'credentials',
    pathMatch: 'full',
  },

  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: '',
        // canActivate: [permissionGuard],
        // data: { permission: 'device_view' },
        loadComponent: () =>
          import('./components/home/home').then((m) => m.Home),
      },
      {
        path: 'reports',
        // canActivate: [permissionGuard],
        // data: { permission: 'device_view' },
        loadComponent: () =>
          import('./components/reports/reports').then((m) => m.Reports),
      },
      {
        path: 'riders',
        // canActivate: [permissionGuard],
        // data: { permission: 'device_view' },
        loadComponent: () =>
          import('./components/riders/riders').then((m) => m.Riders),
      },
      {
        path: 'settings',
        // canActivate: [permissionGuard],
        // data: { permission: 'device_view' },
        loadComponent: () =>
          import('./components/settings/settings').then((m) => m.Settings),
      },
      //   {
      //     path: 'analytics',
      //     // canActivate: [permissionGuard],
      //     // data: { permission: 'device_view' },
      //     // loadComponent: () =>
      //     //   import('./analytics/analytics').then((m) => m.Analytics),
      //   },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
