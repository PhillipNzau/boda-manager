import { Component, inject, OnInit, signal } from '@angular/core';
import { StorageService } from '../../../shared/service/storage.service';
import { DashboardService } from '../../shared/services/dashboard-service';
import { RouterLink } from '@angular/router';
import { TransactionStats } from '../../shared/models/dashboard-model';
import { PaymentsService } from '../../shared/services/payments-service';
import { PaymentModel } from '../../shared/models/payments-model';
import { environment } from '../../../../environments/environment.development';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  storageService = inject(StorageService);
  dashboardService = inject(DashboardService);
  paymentsService = inject(PaymentsService);
  toastService = inject(HotToastService);

  total_debt = signal<number>(0);
  total_collected = signal<number>(0);
  total_riders = signal<number>(0);
  transactions_data = signal<TransactionStats[]>([]);
  payments_data = signal<PaymentModel[]>([]);
  user = this.storageService.loadUser();
  h = new Date().getHours();
  label =
    this.h < 12
      ? 'Good Morning'
      : this.h < 17
        ? 'Good Afternoon'
        : 'Good Evening';

  ngOnInit(): void {
    document.documentElement.setAttribute(
      'data-theme',
      this.storageService.state.settings.darkMode ? 'dark' : '',
    );

    this.getDashboardData();
    this.getMonthlyAnalyticsData();
    this.listPaymentsData();
  }

  toggleTheme(): void {
    this.storageService.toggleTheme();
  }

  getDashboardData(): void {
    this.dashboardService.getDashboardSummary().subscribe({
      next: (res) => {
        this.total_collected.set(res.today_collected);
        this.total_debt.set(res.outstanding_debt);
        this.total_riders.set(res.total_riders);
      },
      error: (err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      },
    });
  }

  getMonthlyAnalyticsData(): void {
    this.dashboardService.getMonthlyAnalytics().subscribe({
      next: (res) => {},
      error: (err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      },
    });
  }

  listPaymentsData(): void {
    this.dashboardService.listPayments().subscribe({
      next: (res) => {
        this.transactions_data.set(res);
      },
      error: (err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      },
    });
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
