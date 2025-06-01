import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth: AuthService = Inject(AuthService);
  const token = auth.getToken();
  if (req.url.includes('login') || !token) {
    return next(req);
  }
  if (token) {
    let clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    next(clonedReq);
  }
  return next(req);
};
