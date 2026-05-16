import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  of,
  switchMap,
  take,
  tap,
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

const ETAG_PREFIX = 'etag_cache_';
const RESPONSE_PREFIX = 'response_cache_';

function getStorageKey(prefix: string, url: string): string {
  return `${prefix}${btoa(url)}`;
}

function saveETag(url: string, etag: string) {
  localStorage.setItem(getStorageKey(ETAG_PREFIX, url), etag);
}

function getETag(url: string): string | null {
  return localStorage.getItem(getStorageKey(ETAG_PREFIX, url));
}

function saveResponse(url: string, response: any) {
  localStorage.setItem(
    getStorageKey(RESPONSE_PREFIX, url),
    JSON.stringify(response),
  );
}

function getResponse(url: string): any | null {
  const cached = localStorage.getItem(getStorageKey(RESPONSE_PREFIX, url));
  return cached ? JSON.parse(cached) : null;
}

function clearCache() {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(ETAG_PREFIX) || key.startsWith(RESPONSE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Authservice);
  const router = inject(Router);

  const token = authService.getAccessToken();
  const isExcluded = excludedRoutes.some((route) => req.url.includes(route));

  let authReq = req;

  // -----------------------
  // Attach auth token
  // -----------------------
  if (token && !isExcluded) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // -----------------------
  // Attach ETag for GET
  // -----------------------
  if (authReq.method === 'GET') {
    const etag = getETag(authReq.urlWithParams);

    if (etag) {
      authReq = authReq.clone({
        setHeaders: {
          'If-None-Match': etag,
        },
      });
    }
  }

  return next(authReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && authReq.method === 'GET') {
        const etag = event.headers.get('etag');

        if (etag) {
          saveETag(authReq.urlWithParams, etag);
          saveResponse(authReq.urlWithParams, event.body);
        }
      }
    }),

    catchError((error: HttpErrorResponse) => {
      // -----------------------
      // Handle 304 Not Modified
      // -----------------------
      if (error.status === 304 && authReq.method === 'GET') {
        const cachedBody = getResponse(authReq.urlWithParams);

        if (cachedBody) {
          return of(
            new HttpResponse({
              body: cachedBody,
              status: 200,
            }),
          );
        }
      }

      // -----------------------
      // Ignore non-401 errors
      // -----------------------
      if (error.status !== 401 || isExcluded) {
        return throwError(() => error);
      }

      // -----------------------
      // Refresh token flow
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

            clearCache();
            authService.logout();
            router.navigate(['/auth']);

            return throwError(() => refreshError);
          }),
        );
      }

      // -----------------------
      // Wait for refresh
      // -----------------------
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
