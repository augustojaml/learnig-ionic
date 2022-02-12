import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storageService: StorageService, private router: Router) {}

  public appPages = [
    // { title: 'Home', url: '/home', icon: '' },
    { title: 'Categories', url: '/categories', icon: '' },
    { title: 'Profile', url: '/profile', icon: '' },
    { title: 'Carrinho', url: '/cart', icon: '' },
    { title: 'Logout', url: null, icon: null },
  ];

  logout() {
    this.storageService.setLocalUser(null);
    this.router.navigate(['/home']);
  }
}
