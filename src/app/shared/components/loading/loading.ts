import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.html',
  styleUrls: ['./loading.css'],
})
export class LoadingComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      const authScreen = document.getElementById('screen-auth');

      if (loadingScreen) {
        loadingScreen.style.opacity = '0';

        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 400);
      }

      // Replace with your real auth logic
      const hasToken = this.checkToken();

      if (hasToken) {
        this.bootApp();
      } else if (authScreen) {
        authScreen.classList.add('active');
      }
    }, 1200);
  }

  checkToken(): boolean {
    return !!localStorage.getItem('token');
  }

  bootApp(): void {
    console.log('App booting...');
    // Add your boot logic here
  }
}
