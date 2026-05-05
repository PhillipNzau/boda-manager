import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Auth } from './auth/auth';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then(
        (mod) => mod.DASHBOARD_ROUTES,
      ),
    // canActivate: [() => inject(Authservice).isLoggedIn],
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth').then((m) => m.Auth),
  },
];
