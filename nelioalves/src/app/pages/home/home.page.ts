import { CredentialDTO } from './../../../models/credential.dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  credential: CredentialDTO = {
    email: '',
    password: '',
  };

  constructor(
    private route: Router,
    private menuController: MenuController,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
  }

  login() {
    this.authService.authenticate(this.credential).subscribe(
      (response) => {
        this.authService.successFulLogin(response.headers.get('Authorization'));
        this.route.navigate(['/categories']);
      },
      (error) => {}
    );
  }

  ngOnInit() {
    this.authService.refreshToken().subscribe(
      (response) => {
        this.authService.successFulLogin(response.headers.get('Authorization'));
        this.route.navigate(['/categories']);
      },
      (error) => {}
    );
  }
}
