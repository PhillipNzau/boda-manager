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
      //   {
      //     path: 'settings',
      //     // canActivate: [permissionGuard],
      //     // data: { permission: 'device_view' },
      //     // loadComponent: () =>
      //     //   import('./settings/settings').then((m) => m.Settings),
      //   },
      //   {
      //     path: 'analytics',
      //     // canActivate: [permissionGuard],
      //     // data: { permission: 'device_view' },
      //     // loadComponent: () =>
      //     //   import('./analytics/analytics').then((m) => m.Analytics),
      //   },
      //   {
      //     path: '**',
      //     redirectTo: 'credentials',
      //   },
    ],
  },
];
