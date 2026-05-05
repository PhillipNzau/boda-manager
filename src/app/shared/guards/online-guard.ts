import { CanActivateFn } from '@angular/router';

export const onlineGuard: CanActivateFn = (route, state) => {
  return true;
};
