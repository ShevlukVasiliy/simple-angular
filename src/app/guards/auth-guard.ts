import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';

export const authGuard: CanActivateFn = () => {
  var store = inject(Store);
  var router = inject(Router);

  if (store.selectSnapshot(AuthState.isAuthorized)) {
    return true;
  }

  return router.createUrlTree(['/access-denied']);
};

export const adminGuard: CanActivateFn = () => {
  var store = inject(Store);
  var router = inject(Router);

  if (store.selectSnapshot(AuthState.isAdmin)) {
    return true;
  }

  return router.createUrlTree(['/access-denied']);
};

export const guestGuard: CanActivateFn = () => {
  var store = inject(Store);
  var router = inject(Router);

  if (!store.selectSnapshot(AuthState.isAuthorized)) {
    return true;
  }

  return router.createUrlTree(['/']);
};
