import { Component } from '@angular/core';
import { Hero } from '../../shared/hero/hero';
import { Formulario } from '../../shared/formulario/formulario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [Hero, Formulario],
  templateUrl: './usuarios.html',

})
export class Usuarios {
}

/*Cambio:
Se añadió standalone: true para asegurar que funcione con la carga perezosa.
Se eliminó/comentó la línea styleUrl porque no existía el archivo .css, lo que causaba error.*/