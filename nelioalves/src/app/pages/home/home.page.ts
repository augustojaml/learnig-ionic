import { CredentialDTO } from './../../../models/credential.dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

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

  constructor(private route: Router, private menuController: MenuController) {}

  login() {
    console.log(this.credential);
    this.route.navigate(['/categories']);
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
  }

  ngOnInit() {}
}
