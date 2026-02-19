import { Component, inject } from '@angular/core'; // 1. Quitamos 'Input' que no se usa
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service'; // 2. Importamos el servicio

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  // styleUrl: './nav-bar.css', // 3. Comentamos o borramos esto porque el archivo no existe
})
export class NavBar {

  // 4. ¡ESTA ES LA LÍNEA QUE TE FALTA! 
  // Sin esto, el HTML no puede saber si hay sesión iniciada
  authService = inject(AuthService); 
  
  private router = inject(Router);

  cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas salir del sistema? 🐾')) {
      this.authService.logout(); // Usamos el servicio para cerrar sesión real
      this.router.navigate(['/login']); 
    }
  }
}

/*Logic (.ts):
Se inyectó AuthService para poder leer la señal de sesión.
Se creó el método cerrarSesion() que llama al logout del servicio y redirige.
Vista (.html):
Se añadieron bloques @if para ocultar el botón "Usuarios" y cambiar entre "Login/Salir" dinámicamente según el estado de la sesión.
*/