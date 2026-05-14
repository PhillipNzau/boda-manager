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
  editRiderUrl = environment.editRider;

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

  createRider(riderData: any) {
    return this.http.post(this.createRiderUrl, riderData).pipe(
      map((res) => {
        // if (res.status === 200) {
        //   return res;
        // }
        return res;
      }),
    );
  }

  editRider(riderData: any) {
    return this.http.put(this.editRiderUrl + riderData.id, riderData).pipe(
      map((res) => {
        // if (res.status === 200) {
        //   return res;
        // }
        return res;
      }),
    );
  }

  createMotorcycle(rideData: any) {
    return this.http.post(this.createMotorcycleUrl, rideData).pipe(
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
