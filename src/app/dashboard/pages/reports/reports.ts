import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard-service';
import {
  Expenses,
  MonthlyAnalyticsStats,
} from '../../shared/models/dashboard-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  dashboardService = inject(DashboardService);
  monthly_analytics = signal<any>({});
  expenses_analytics = signal<Expenses[]>([]);

  ngOnInit(): void {
    this.getMonthlyAnalyticsData();
    this.listExpensesData();
  }

  listExpensesData(): void {
    this.dashboardService.listExpenses().subscribe({
      next: (res) => {
        this.expenses_analytics.set(res);
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
      next: (res) => {
        this.monthly_analytics.set(res);
      },
      error: (err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      },
    });
  }
}
