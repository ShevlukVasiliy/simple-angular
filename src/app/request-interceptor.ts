import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const clone = req.clone({ url: req.url + '/1' });
  return next(clone);
};
