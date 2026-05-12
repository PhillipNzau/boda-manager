import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Auth } from './auth/auth';
import { Authservice } from './auth/services/auth-service';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth').then((m) => m.Auth),
  },
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then(
        (mod) => mod.DASHBOARD_ROUTES,
      ),
    canActivate: [() => inject(Authservice).isLoggedIn],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
