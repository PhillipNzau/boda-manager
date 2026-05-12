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

  listRidersUrl = environment.listRiders;
  createRiderUrl = environment.createRider;
  deleteRiderUrl = environment.deleteRider;
  listMotorcyclesUrl = environment.listMotorcycles;
  createMotorcycleUrl = environment.createMotorcycle;

  listRiders() {
    return this.http.get<Rider[]>(this.listRidersUrl).pipe(
      map((res: Rider[]) => {
        return res;
      }),
    );
  }
  listMotorcycles() {
    return this.http.get<Motorcycle[]>(this.listMotorcyclesUrl).pipe(
      map((res: Motorcycle[]) => {
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
