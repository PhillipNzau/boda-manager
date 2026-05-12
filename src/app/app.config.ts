import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
// import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './auth/services/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    // provideAnimation(),
    provideHotToastConfig({
      visibleToasts: 1,
      duration: 700,
      position: 'bottom-center',
    }),
    // provideServiceWorker('ngsw-worker.js', {
    //   enabled: true,
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),
  ],
};
