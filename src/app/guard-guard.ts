import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user-service';

export const roleGuard: CanActivateFn = () => {
  var user = inject(UserService);
  var router = inject(Router);

  if (user.role() === 'user') {
    return router.parseUrl('/error');
  }
  return user.role() === 'admin';
};
