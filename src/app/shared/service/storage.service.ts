import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  state = {
    settings: {
      dailyRate: 350,
      darkMode: false,
      notifications: true,
    },
  };

  constructor() {
    this.load();
  }

  save(): void {
    try {
      localStorage.setItem(
        'boda_state',
        JSON.stringify({
          settings: this.state.settings,
        }),
      );
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }

  load(): void {
    try {
      const data = JSON.parse(localStorage.getItem('boda_state') || '{}');

      if (data.settings) {
        this.state.settings = {
          ...this.state.settings,
          ...data.settings,
        };
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    }
  }

  toggleTheme(): void {
    this.state.settings.darkMode = !this.state.settings.darkMode;

    document.documentElement.setAttribute(
      'data-theme',
      this.state.settings.darkMode ? 'dark' : '',
    );

    this.save();
  }

  setToken(token: string): void {
    localStorage.setItem('boda_jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('boda_jwt');
  }

  clearToken(): void {
    localStorage.removeItem('boda_jwt');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
