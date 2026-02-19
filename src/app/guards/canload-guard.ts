import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router'; 
import { AuthService } from '../services/auth-service';

export const candloadGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.sesionIniciada()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

//Es el "portero". Contiene la lógica CanMatchFn que verifica si sesionIniciada() es verdadera.
//  Si no lo es, bloquea la descarga del código y redirige al login.