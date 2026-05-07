import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-auth',
  imports: [Button, Input, LoadingComponent],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private router = inject(Router);
  loginForm = {
    email: createField('', [required(), emailValidator()]),
    password: createField('', [required(), minLength(6)]),
  };
  isLoading = false;

  get formValid() {
    return Object.values(this.loginForm).every((f) => f.valid());
  }

  handleSubmit() {
    console.log(this.formValid);

    // Mark all fields as touched
    Object.values(this.loginForm).forEach((f) => f.touched.set(true));

    if (this.formValid) {
      console.log('Email:', this.loginForm.email.value());
      console.log('Password:', this.loginForm.password.value());

      // show loading screen
      this.isLoading = true;

      // simulate loading before navigation
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1200);
    }
  }
}
