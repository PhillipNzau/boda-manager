import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { map } from 'rxjs';
import {
  DashboardStats,
  MonthlyAnalyticsStats,
  TransactionStats,
} from '../models/dashboard-model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private router = inject(Router);

  dashboardSummaryUrl = environment.dashboardSummary;
  missedPaymentsUrl = environment.missedPayments;
  monthlyAnalyticsUrl = environment.monthlyAnalytics;
  motorcycleProfitabilityUrl = environment.motorcycleProfitability;
  listPaymentsUrl = environment.listPayments;
  exportExcelUrl = environment.exportExcel;

  exportExcel() {
    return this.http.get(this.exportExcelUrl, {
      responseType: 'blob', // important for files
    });
  }

  getDashboardSummary() {
    return this.http.get<DashboardStats>(this.dashboardSummaryUrl).pipe(
      map((res: DashboardStats) => {
        return res;
      }),
    );
  }

  getMonthlyAnalytics() {
    return this.http.get<MonthlyAnalyticsStats>(this.monthlyAnalyticsUrl).pipe(
      map((res: MonthlyAnalyticsStats) => {
        return res;
      }),
    );
  }

  listPayments() {
    return this.http.get<TransactionStats[]>(this.listPaymentsUrl).pipe(
      map((res: TransactionStats[]) => {
        return res;
      }),
    );
  }

  // getSingleCredential(credentialId: string) {
  //   return this.http.get(this.listSingleCredentialUrl + credentialId).pipe(
  //     map((res) => {
  //       return res;
  //     })
  //   );
  // }
  // getDashboardSummary()
}
