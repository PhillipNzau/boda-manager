import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/service/storage.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
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
}
