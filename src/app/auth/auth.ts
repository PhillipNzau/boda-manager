import { Component, inject, signal } from '@angular/core';
import { Button } from '../shared/components/button/button';
import { Input } from '../shared/components/input/input';
import {
  createField,
  emailValidator,
  minLength,
  required,
} from './models/form-field.model';
import { Router } from '@angular/router';
import { LoadingComponent } from '../shared/components/loading/loading';
import { Authservice } from './services/auth-service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-auth',
  imports: [Button, Input, LoadingComponent],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private router = inject(Router);
  authService = inject(Authservice);
  toastService = inject(HotToastService);

  loginForm = {
    name: createField('', [required(), minLength(3)]),
    email: createField('', [required(), emailValidator()]),
    password: createField('', [required(), minLength(6)]),
  };

  get formValid() {
    const alwaysRequired = [this.loginForm.email, this.loginForm.password];
    const signupOnly = [this.loginForm.name];

    const baseValid = alwaysRequired.every((f) => f.valid());
    const signupValid = !this.isSignup() || signupOnly.every((f) => f.valid());

    return baseValid && signupValid;
  }

  isSignup = signal<boolean>(false);
  isVerifyOtp = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  toggleSignup() {
    this.isSignup.set(!this.isSignup());
  }

  handleLoginSubmit() {
    const loadingToast = this.toastService.loading('Processing...');
    this.isSubmitting.set(true);

    // Mark all fields as touched
    Object.values(this.loginForm).forEach((f) => f.touched.set(true));
    const formValue = {
      email: this.loginForm.email.value(),
      password: this.loginForm.password.value(),
    };

    this.authService.loginUser(formValue).subscribe({
      next: (res) => {
        this.toastService.success(`Welcome ${res.user.name}!`, {
          duration: 2000,
        });
        loadingToast.close();
        this.isSubmitting.set(false);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.toastService.error(
          `Something went wrong logging in! ${err.error.error}!!`,
          {
            duration: 2000,
          },
        );
        loadingToast.close();
        this.isSubmitting.set(false);
      },
    });
  }

  handleSignupSubmit() {
    const loadingToast = this.toastService.loading('Processing...');
    this.isSubmitting.set(true);

    // Mark all fields as touched
    Object.values(this.loginForm).forEach((f) => f.touched.set(true));
    const formValue = {
      name: this.loginForm.name.value(),
      email: this.loginForm.email.value(),
      password: this.loginForm.password.value(),
    };

    this.authService.registerUser(formValue).subscribe({
      next: (res) => {
        this.toastService.success(`Welcome !`, {
          duration: 2000,
        });
        loadingToast.close();
        this.isSubmitting.set(false);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.toastService.error(
          `Something went wrong logging in! ${err.error.error}!!`,
          {
            duration: 2000,
          },
        );
        loadingToast.close();
        this.isSubmitting.set(false);
      },
    });
  }
}
