import { inject, Injectable, signal } from '@angular/core';
import { User } from 'firebase/auth'; 
import { UsuarioService } from './usuario-service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private servicioUsuario = inject(UsuarioService);

  /** * VÍNCULO CON CANMATCH: 
   * Esta Signal es la "llave" maestra. El guardia CanMatch inyectará este servicio
   * y consumirá directamente este valor para permitir o denegar el acceso a rutas.
   */
  sesionIniciada = signal<boolean>(localStorage.getItem('sesion') === 'true');
  
  /** * SEGURIDAD POR ROL: 
   * Permite que el CanMatch no solo verifique SI hay sesión, sino QUÉ TIPO de usuario es.
   * Útil para diferenciar entre un cliente y un administrador de la veterinaria.
   */
  rolActual = signal<string | null>(localStorage.getItem('rol'));
  
  usuario: User | null = null;

  login(email: string, password: string): Observable<boolean> {
    return this.servicioUsuario.getUsuarios().pipe(
      map(usuarios => {
        const usuarioCoincide = usuarios.find(u => u.email === email && u.password === password);

        if (usuarioCoincide) {
          // 1. PERSISTENCIA: Evita que la sesión se pierda al recargar (F5).
          localStorage.setItem('sesion', 'true');
          localStorage.setItem('user', JSON.stringify(usuarioCoincide));
          localStorage.setItem('rol', usuarioCoincide.rol);

          /** * 2. REACTIVIDAD: Al usar .set(true), notificamos instantáneamente 
           * al Guardia y al NavBar que el estado de seguridad ha cambiado.
           */
          this.sesionIniciada.set(true);
          this.rolActual.set(usuarioCoincide.rol); 

          return true;
        }
        return false;
      })
    );
  }

  /**
   * CIERRE DE SEGURIDAD:
   * Al limpiar el localStorage y resetear las Signals, el CanMatch
   * bloqueará automáticamente cualquier navegación posterior a zonas privadas.
   */
  logout() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    
    this.sesionIniciada.set(false);
    this.rolActual.set(null);
  }
}