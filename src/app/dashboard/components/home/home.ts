import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
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
