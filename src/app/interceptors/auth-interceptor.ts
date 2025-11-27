import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  // Obtener token del local storage
  const token = localStorage.getItem('token');

  // Clonar request y agregar Authorization si existe token
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    // Manejo de errores (ej: token inválido)
    tap({
      error: (err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {

          // Opcional: limpiar token
          localStorage.removeItem('token');

          // Enviar al login
          router.navigate(['/login']);
        }
      },
    })
  );
};
