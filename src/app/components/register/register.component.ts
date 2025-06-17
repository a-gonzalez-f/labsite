// register.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('Intentando registrar...');
    if (this.registerForm.invalid) return;

    const { usuario, contrasena } = this.registerForm.value;
    console.log('Enviando:', { usuario, contrasena });

    this.http.post('/api/auth/register', { usuario, contrasena }).subscribe({
      next: () => {
        this.successMessage = 'Usuario creado con éxito. Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Error al registrarse';
      },
    });

    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
    console.log(this.registerForm.errors);
  }
}
