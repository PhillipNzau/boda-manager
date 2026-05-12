import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Modal } from '../modal/modal';
import { Rider } from '../../../dashboard/shared/models/riders-model';
import { RidersService } from '../../../dashboard/shared/services/riders-service';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-navigation',
  imports: [
    RouterLink,
    RouterLinkActive,
    Modal,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './bottom-navigation.html',
  styleUrl: './bottom-navigation.css',
})
export class BottomNavigation implements OnInit {
  ridersService = inject(RidersService);
  private fb = inject(FormBuilder);
  riders_data = signal<Rider[]>([]);

  isModal = signal<boolean>(false);

  paymentForm = this.fb.group({
    rider_id: ['', Validators.required],
    amount: [350, [Validators.required, Validators.min(0)]],
    method: ['mpesa', Validators.required],
    expected_amount: [350, [Validators.required, Validators.min(0)]],
    motorcycle_id: ['', Validators.required],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    // status: ['paid', Validators.required],
    // note: [''],
  });

  ngOnInit(): void {
    this.getRidersData();
  }

  onRiderChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    const rider = this.riders_data().find((r) => r.id === id);
    if (rider) this.setRider(rider);
  }

  setRider(rider: Rider) {
    this.paymentForm.patchValue({
      expected_amount: rider.daily_target,
      motorcycle_id: rider.motorcycle_id,
    });
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

  toggleAddModal(type?: boolean) {
    if (type === undefined) {
      this.isModal.update((prev) => !prev);
    } else {
      this.isModal.set(type);
    }
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const formData = this.paymentForm.value;
      console.log('Recording Payment:', formData);

      // Logic to send to your service
      // this.paymentService.record(formData).subscribe(...)

      this.toggleAddModal(false);
      this.paymentForm.reset({ method: 'mpesa', amount: 350 });
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }
}
