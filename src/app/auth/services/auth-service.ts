import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import {
  LoginUserModel,
  LoginUserResponseModel,
  RegisterUserModel,
} from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private loggedIn = false;
  private http = inject(HttpClient);
  private router = inject(Router);

  loginUserUrl = environment.loginUser;
  registerUserUrl = environment.registerUser;
  refreshTokenUrl = environment.refreshToken;

  // ------------------------
  // LOGIN
  // ------------------------
  loginUser(userData: LoginUserModel): Observable<LoginUserResponseModel> {
    return this.http
      .post<LoginUserResponseModel>(this.loginUserUrl, userData)
      .pipe(
        tap((res) => {
          if (res.access_token) {
            this.setSession(res);
          }
          return res;
        }),
      );
  }

  // ------------------------
  // REGISTER
  // ------------------------
  registerUser(
    userData: RegisterUserModel,
  ): Observable<LoginUserResponseModel> {
    return this.http
      .post<LoginUserResponseModel>(this.registerUserUrl, userData)
      .pipe(
        tap((res) => {
          if (res.access_token) {
            this.setSession(res);
          }
          return res;
        }),
      );
  }

  // ------------------------
  // REFRESH TOKEN
  // ------------------------
  refreshToken(): Observable<any> {
    const refresh = this.getRefreshToken();

    return this.http
      .post<any>(this.refreshTokenUrl, {
        refresh_token: refresh,
      })
      .pipe(
        tap((res) => {
          if (res.access_token) {
            localStorage.setItem('subSfTk', res.access_token);
          }

          if (res.refresh_token) {
            localStorage.setItem('subSfRTk', res.refresh_token);
          }
        }),
      );
  }

  // ------------------------
  // STORAGE HELPERS
  // ------------------------
  setSession(res: any) {
    localStorage.setItem('subSfTk', res.access_token);
    localStorage.setItem('subSfRTk', res.refresh_token);
    localStorage.setItem('cnLgSubSf', 'true');

    if (res.user) {
      localStorage.setItem('user', JSON.stringify(res.user));
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('subSfTk');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('subSfRTk');
  }

  logout() {
    localStorage.removeItem('subSfTk');
    localStorage.removeItem('subSfRTk');
    localStorage.removeItem('cnLgSubSf');
    localStorage.removeItem('user');

    this.router.navigate(['/auth']);
  }

  // ------------------------
  // AUTH STATE
  // ------------------------
  get isLoggedIn(): boolean {
    this.loggedIn = !!localStorage.getItem('cnLgSubSf');

    if (!this.loggedIn) {
      this.router.navigate(['/auth']);
    }
    return this.loggedIn;
  }
}
