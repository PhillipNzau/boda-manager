import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { BottomNavigation } from '../shared/components/bottom-navigation/bottom-navigation';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, BottomNavigation],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
