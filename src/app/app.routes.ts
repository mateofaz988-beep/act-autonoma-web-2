import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Acerca } from './features/acerca/acerca';
import { Consultas } from './features/consultas/consultas';
import { Mascotas } from './shared/mascotas/mascotas';
// BORRA LA IMPORTACIÓN DE USUARIOS AQUÍ
import { FormularioCuenta } from './shared/formulario-cuenta/formulario-cuenta';
import { Login } from './shared/login/login';
import { candloadGuard } from './guards/canload-guard';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'acerca', component: Acerca },
    { path: 'consultas', component: Consultas },
    { path: 'mascotas', component: Mascotas },
    
    // RUTA CORREGIDA:
    { 
      path: 'usuarios', 
      loadComponent: () => import('./features/usuarios/usuarios').then(m => m.Usuarios), 
      canMatch: [candloadGuard] // Usamos canMatch
    },

    { path: 'cuenta', component: FormularioCuenta },
    { path: 'login', component: Login }
];

/*Antes: Cargaba el componente Usuarios directamente al inicio (Eager Loading).
Ahora:
Se eliminó el import { Usuarios } ... del principio.
Se cambió la ruta a Lazy Loading: loadComponent: () => import(...).then(m => m.Usuarios).
Se añadió la protección: canMatch: [candloadGuard].
*/