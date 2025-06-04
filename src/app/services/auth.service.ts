// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'isLoggedIn';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, 'true');
    }
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return localStorage.getItem(this.TOKEN_KEY) === 'true';
    }
    return false;
  }
}
