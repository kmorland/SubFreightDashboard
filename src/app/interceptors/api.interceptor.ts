import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiEndpoint = environment.apiEndpoint;

  // Only modify requests that start with '/api/'
  if (req.url.startsWith('/api/')) {
    const apiReq = req.clone({
      url: `${apiEndpoint}${req.url}`
    });
    return next(apiReq);
  }

  return next(req);
};
