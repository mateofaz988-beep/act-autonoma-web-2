import { inject, Injectable, signal } from '@angular/core';
import { User } from 'firebase/auth'; // Eliminada la importación errónea de 'email'
import { UsuarioService } from './usuario-service';
import { map, Observable } from 'rxjs';

/*Cambio: Se modernizó para usar Signals (Señales).
sesionIniciada ahora es una señal reactiva (signal<boolean>) conectada al localStorage.
Se corrigió la función login para actualizar estas señales y guardar la sesión.
Se limpiaron importaciones erróneas.*/

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private servicioUsuario = inject(UsuarioService);

  // Inicializamos señales leyendo de localStorage
  sesionIniciada = signal<boolean>(localStorage.getItem('sesion') === 'true');
  rolActual = signal<string | null>(localStorage.getItem('rol'));
  
  usuario: User | null = null;

  login(email: string, password: string): Observable<boolean> {
    return this.servicioUsuario.getUsuarios().pipe(
      map(usuarios => {
        const usuarioCoincide = usuarios.find(u => u.email === email && u.password === password);

        if (usuarioCoincide) {
          // 1. Guardar persistencia
          localStorage.setItem('sesion', 'true');
          localStorage.setItem('user', JSON.stringify(usuarioCoincide));
          localStorage.setItem('rol', usuarioCoincide.rol);

          // 2. Actualizar señales (¡ESTO FALTABA!)
          this.sesionIniciada.set(true);
          this.rolActual.set(usuarioCoincide.rol); 

          return true;
        }
        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    
    this.sesionIniciada.set(false);
    this.rolActual.set(null);
  }
}
