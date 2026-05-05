import { Component } from '@angular/core';
import { Button } from '../shared/components/button/button';
import { Input } from '../shared/components/input/input';

@Component({
  selector: 'app-auth',
  imports: [Button, Input],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  username: any;
  password: any;

  handleSubmit() {
    console.log('====================================');
    console.log('clicked:', this.username);
    console.log('====================================');
  }
}
