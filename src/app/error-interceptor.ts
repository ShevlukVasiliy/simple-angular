import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError, throwError } from 'rxjs';
import { AuthState } from './store/auth.state';
import { LogoutUser } from './store/auth.model';
import { ToastService } from './services/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  var store = inject(Store);
  var router = inject(Router);
  var toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && store.selectSnapshot(AuthState.isAuthorized)) {
        store.dispatch(new LogoutUser());
        toastService.error('Сессия истекла', 'Пожалуйста, войдите в аккаунт снова.');
        router.navigateByUrl('/authorization');
      }

      return throwError(() => error);
    }),
  );
};
