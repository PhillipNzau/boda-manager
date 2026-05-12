import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { Authservice } from './auth-service';

const excludedRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh',
  '/auth/request-otp',
];

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Authservice);
  const router = inject(Router);

  const token = authService.getAccessToken();

  const isExcluded = excludedRoutes.some((route) => req.url.includes(route));

  let authReq = req;

  // Attach token
  if (token && !isExcluded) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isExcluded) {
        return throwError(() => error);
      }

      // -----------------------
      // TOKEN REFRESH FLOW
      // -----------------------
      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.refreshToken().pipe(
          switchMap((response) => {
            isRefreshing = false;

            const newToken = response.access_token;
            refreshTokenSubject.next(newToken);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            return next(retryReq);
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            authService.logout();
            router.navigate(['/auth']);

            return throwError(() => refreshError);
          }),
        );
      }

      // Wait if refresh already happening
      return refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((newToken) => {
          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken!}`,
            },
          });

          return next(retryReq);
        }),
      );
    }),
  );
};
