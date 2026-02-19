import { Component, inject } from '@angular/core'; 
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service'; 

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',

})
export class NavBar {


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