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

  login(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem(this.TOKEN_KEY);
    }
    return false;
  }
}
