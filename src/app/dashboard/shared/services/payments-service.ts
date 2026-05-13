import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { CreatePaymentModel, PaymentModel } from '../models/payments-model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private http = inject(HttpClient);

  // payments
  listPaymentsUrl = environment.listPayments;
  getPaymentUrl = environment.getPayment;
  createPaymentUrl = environment.createPayment;
  deletePaymentUrl = environment.deletePayment;

  listPayments() {
    return this.http.get<PaymentModel[]>(this.listPaymentsUrl).pipe(
      map((res: PaymentModel[]) => {
        return res;
      }),
    );
  }

  getSinglePayment(paymentId: string) {
    return this.http.get(this.getPaymentUrl + paymentId).pipe(
      map((res) => {
        return res;
      }),
    );
  }

  createPayment(paymentData: any) {
    return this.http.post(this.createPaymentUrl, paymentData).pipe(
      map((res) => {
        // if (res.status === 200) {
        //   return res;
        // }
        return res;
      }),
    );
  }

  deleteSinglePayment(paymentId: string) {
    return this.http.delete(this.deletePaymentUrl + paymentId).pipe(
      map((res) => {
        return res;
      }),
    );
  }
}
