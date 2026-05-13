import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/service/storage.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { DashboardService } from '../../shared/services/dashboard-service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  private router = inject(Router);

  storageService = inject(StorageService);
  toastService = inject(HotToastService);
  dashboardService = inject(DashboardService);

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

  downloadReport() {
    const loadingToast = this.toastService.loading('Processing...');

    this.dashboardService.exportExcel().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        );
        const a = document.createElement('a');
        a.href = url;
        a.download = 'boda-manager-report.xlsx';
        document.body.appendChild(a);
        a.click();

        // Cleanup
        a.remove();
        window.URL.revokeObjectURL(url);

        this.toastService.success(`Downloaded excel successfully!`, {
          duration: 2000,
        });
        loadingToast.close();
      },
      error: (err) => {
        loadingToast.close();
        this.toastService.error(
          `Something went wrong downloading excel! ${err.error?.error || ''}`,
          { duration: 2000 },
        );
      },
    });
  }
}
