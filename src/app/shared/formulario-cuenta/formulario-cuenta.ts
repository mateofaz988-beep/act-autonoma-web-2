import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-cuenta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-cuenta.html',
  styleUrl: './formulario-cuenta.css',
})
export class FormularioCuenta {
  private fb = inject(FormBuilder);

  reglaEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  // 1. Definimos la validación primero para evitar el error de "used before its initialization"
  validarClaves(control: AbstractControl): ValidationErrors | null {
    const clave1 = control.get('password')?.value;
    const clave2 = control.get('repeatPassword')?.value;
    return clave1 === clave2 ? null : { noCoinciden: true };
  }

  // 2. Inicializamos el formulario con los campos correctos
  formCuenta = this.fb.group(
    {
      email: ['', [Validators.required, Validators.pattern(this.reglaEmail)]],
      comentar: ['', [Validators.required]] 
    },
    { validators: this.validarClaves.bind(this) }
  );

  mostrarError(campo: string, tipoError: string): boolean {
    const input = this.formCuenta.get(campo);
    return !!(input && input.invalid && input.touched && input.hasError(tipoError));
  }

  // Lógica de envío a Netlify
  registrar() {
    if (this.formCuenta.valid) {
      // Formateamos los datos para que Netlify los reconozca
      const contenido = new URLSearchParams();
      contenido.set('form-name', 'contacto');
      contenido.set('email', this.formCuenta.value.email ?? '');
      contenido.set('comentario', this.formCuenta.value.comentar ?? '');

     
      fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: contenido.toString()
      })
      .then(() => {
        alert("enviado con exito")
        this.formCuenta.reset();
      console.log('datos enviados: ${contenido}');

      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
        alert('Hubo un error al enviar el mensaje.');
      });
    }
  }
}