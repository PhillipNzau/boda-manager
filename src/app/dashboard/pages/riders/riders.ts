import { Component, inject, OnInit, signal } from '@angular/core';
import { RidersService } from '../../shared/services/riders-service';
import { StorageService } from '../../../shared/service/storage.service';
import { Motorcycle, Rider } from '../../shared/models/riders-model';

@Component({
  selector: 'app-riders',
  imports: [],
  templateUrl: './riders.html',
  styleUrl: './riders.css',
})
export class Riders implements OnInit {
  storageService = inject(StorageService);
  ridersService = inject(RidersService);

  riders_data = signal<Rider[]>([]);
  bikes_data = signal<Motorcycle[]>([]);
  isRiders = signal<boolean>(true);

  ngOnInit(): void {
    this.getMotorcyclesData();
    this.getRidersData();
  }

  getRidersData(): void {
    this.ridersService.listRiders().subscribe({
      next: (res) => {
        this.riders_data.set(res);
      },
      error: (err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      },
    });
  }

  getMotorcyclesData(): void {
    this.ridersService.listMotorcycles().subscribe({
      next: (res) => {
        this.bikes_data.set(res);
      },
      error: (err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      },
    });
  }
}
