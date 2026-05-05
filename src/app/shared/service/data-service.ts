import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  // Use Angular Signals for reactive state management
  user = signal({ name: 'Admin', balance: 45200 });
  isDarkMode = signal(false);

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
    document.documentElement.setAttribute(
      'data-theme',
      this.isDarkMode() ? 'dark' : 'light',
    );
  }
}
