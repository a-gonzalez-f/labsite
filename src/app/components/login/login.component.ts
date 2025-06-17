// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { usuario, contrasena } = this.loginForm.value;

    this.http
      .post<{ token: string }>('/api/auth/login', { usuario, contrasena })
      .subscribe({
        next: (res) => {
          this.authService.login(res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Error al iniciar sesión';
        },
      });
  }
}
