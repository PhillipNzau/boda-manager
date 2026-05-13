import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Motorcycle, Rider } from '../models/riders-model';

@Injectable({
  providedIn: 'root',
})
export class RidersService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // riders
  listRidersUrl = environment.listRiders;
  createRiderUrl = environment.createRider;
  deleteRiderUrl = environment.deleteRider;

  // motorcycle
  listMotorcyclesUrl = environment.listMotorcycles;
  createMotorcycleUrl = environment.createMotorcycle;

  listRiders() {
    return this.http.get<Rider[]>(this.listRidersUrl).pipe(
      map((res: Rider[]) => {
        return res.reverse();
      }),
    );
  }
  listMotorcycles() {
    return this.http.get<Motorcycle[]>(this.listMotorcyclesUrl).pipe(
      map((res: Motorcycle[]) => {
        return res.reverse();
      }),
    );
  }

  createRider(paymentData: any) {
    return this.http.post(this.createRiderUrl, paymentData).pipe(
      map((res) => {
        // if (res.status === 200) {
        //   return res;
        // }
        return res;
      }),
    );
  }

  createMotorcycle(paymentData: any) {
    return this.http.post(this.createMotorcycleUrl, paymentData).pipe(
      map((res) => {
        // if (res.status === 200) {
        //   return res;
        // }
        return res;
      }),
    );
  }

  deleteRider(riderId: string) {
    return this.http.delete(this.deleteRiderUrl + riderId).pipe(
      map((res) => {
        return res;
      }),
    );
  }
  // getDashboardSummary()
}
