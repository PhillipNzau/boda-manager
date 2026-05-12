import { Component, inject, OnInit, signal } from '@angular/core';
import { StorageService } from '../../../shared/service/storage.service';
import { DashboardService } from '../../shared/services/dashboard-service';
import { RouterLink } from '@angular/router';
import { TransactionStats } from '../../shared/models/dashboard-model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  storageService = inject(StorageService);
  dashboardService = inject(DashboardService);

  total_debt = signal<number>(0);
  total_collected = signal<number>(0);
  total_riders = signal<number>(0);
  transactions_data = signal<TransactionStats[]>([]);

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
}
