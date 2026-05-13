import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  private router = inject(Router);

  storageService = inject(StorageService);

  ngOnInit(): void {
    document.documentElement.setAttribute(
      'data-theme',
      this.storageService.state.settings.darkMode ? 'dark' : '',
    );
  }

  toggleTheme(): void {
    this.storageService.toggleTheme();
  }

  logOut(): void {
    this.storageService.resetUser();
    this.router.navigate(['/auth']);
  }
}
