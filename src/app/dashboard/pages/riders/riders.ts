import { Component, inject, OnInit, signal } from '@angular/core';
import { RidersService } from '../../shared/services/riders-service';
import { StorageService } from '../../../shared/service/storage.service';
import { Motorcycle, Rider } from '../../shared/models/riders-model';
import { Modal } from '../../../shared/components/modal/modal';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-riders',
  imports: [Modal, ReactiveFormsModule, CommonModule],
  templateUrl: './riders.html',
  styleUrl: './riders.css',
})
export class Riders implements OnInit {
  private fb = inject(FormBuilder);
  toastService = inject(HotToastService);

  storageService = inject(StorageService);
  ridersService = inject(RidersService);

  isEditRiderModal = signal<boolean>(false);
  isEditBikeModal = signal<boolean>(false);
  isAddRiderModal = signal<boolean>(false);
  isAddBikeModal = signal<boolean>(false);

  riders_data = signal<Rider[]>([]);
  bikes_data = signal<Motorcycle[]>([]);
  isRiders = signal<boolean>(true);
  currentYear = new Date().getFullYear();

  riderForm = this.fb.group({
    full_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    license_no: ['', Validators.required],
    daily_target: [350, [Validators.required, Validators.min(0)]],
    motorcycle_id: ['', Validators.required],
  });

  editRiderForm = this.fb.group({
    id: [''],
    full_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    daily_target: [350, [Validators.required, Validators.min(0)]],
    motorcycle_id: ['', Validators.required],
  });

  bikeForm = this.fb.group({
    name: ['', Validators.required],
    plate_number: ['', Validators.required],
    model: ['', Validators.required],
    year: [
      '',
      [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
        Validators.pattern(/^\d{4}$/),
      ],
    ],
  });

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

  setMotorcycle(rider: Rider) {
    // this.riderForm.patchValue({
    //   expected_amount: rider.daily_target,
    //   motorcycle_id: rider.motorcycle_id,
    // });
  }

  toggleAddRiderModal(type?: string, selectedAsset?: any) {
    this.riderForm.reset();

    if (type === 'rider') {
      this.isAddRiderModal.update((prev) => !prev);
    } else if (type === 'bike') {
      this.isAddBikeModal.update((prev) => !prev);
    } else if (type === 'edit-rider' && selectedAsset) {
      this.editRiderForm.patchValue({
        id: selectedAsset._id,
        full_name: selectedAsset.full_name,
        phone_number: selectedAsset.phone_number,
        daily_target: selectedAsset.daily_target,
        motorcycle_id: selectedAsset.motorcycle_id,
      });

      this.isEditRiderModal.update((prev) => !prev);
    } else if (type === 'edit-bike') {
      this.isEditBikeModal.update((prev) => !prev);
    } else {
      this.isAddBikeModal.set(false);
      this.isAddRiderModal.set(false);
      this.isEditRiderModal.set(false);
      this.isEditBikeModal.set(false);
    }
  }

  // onMotorcycleChange(event: Event) {
  //   const id = (event.target as HTMLSelectElement).value;
  //   const rider = this.riders_data().find((r) => r.id === id);
  //   if (rider) this.setMotorcycle(rider);
  // }

  onAddRiderSubmit() {
    const loadingToast = this.toastService.loading('Processing...');
    const formData = this.riderForm.value;

    this.ridersService.createRider(formData).subscribe({
      next: (res) => {
        this.toastService.success(`Rider Created Successfully!`, {
          duration: 2000,
        });

        this.toggleAddRiderModal();
        loadingToast.close();
        this.getRidersData();
      },
      error: (err) => {
        console.error('Error adding rider', err);

        this.toastService.error(`Something went wrong!`, {
          duration: 2000,
        });
        loadingToast.close();
      },
    });
  }
  onEditRiderSubmit() {
    const loadingToast = this.toastService.loading('Processing...');
    const formData = this.editRiderForm.value;

    this.ridersService.editRider(formData).subscribe({
      next: (res) => {
        this.toastService.success(`Rider Updated Successfully!`, {
          duration: 2000,
        });

        this.toggleAddRiderModal();
        loadingToast.close();
        this.getRidersData();
      },
      error: (err) => {
        console.error('Error adding rider', err);

        this.toastService.error(`Something went wrong updating rider!`, {
          duration: 2000,
        });
        loadingToast.close();
      },
    });
  }

  // bike submit
  onAddBikeSubmit() {
    const loadingToast = this.toastService.loading('Processing...');
    const formData = this.bikeForm.value;

    this.ridersService.createMotorcycle(formData).subscribe({
      next: (res) => {
        this.toastService.success(`Created Successfully!`, {
          duration: 2000,
        });

        this.toggleAddRiderModal();
        loadingToast.close();
        this.getMotorcyclesData();
      },
      error: (err) => {
        console.error('Error adding bike', err);

        this.toastService.error(`Something went wrong!`, {
          duration: 2000,
        });
        loadingToast.close();
      },
    });
  }

  removeAsset(rider: Rider) {
    const loadingToast = this.toastService.loading('Processing...');

    this.ridersService.deleteRider(rider.id).subscribe({
      next: () => {
        loadingToast.close();

        this.toastService.success(`Rider removed!`, {
          duration: 2000,
        });
        this.getRidersData();
      },
      error: (err) => {
        loadingToast.close();

        this.toastService.error(`Something went wrong!`, {
          duration: 2000,
        });
      },
    });
  }
}
