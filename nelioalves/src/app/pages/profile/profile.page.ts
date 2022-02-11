import { API_CONFIG } from './../../../config/api.config';
import { ClientDTO } from './../../../models/client.dto';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClientsService } from 'src/services/domain/clients.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  client: ClientDTO;

  constructor(
    private storageService: StorageService,
    private clientsService: ClientsService,
    private route: Router
  ) {}

  getImageBucketUrl() {
    this.clientsService.getImageFromBucket(this.client.id).subscribe(
      (response) => {
        this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`;
      },
      (error) => {}
    );
  }

  ngOnInit() {
    const localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clientsService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.client = response;
          this.getImageBucketUrl();
        },
        (error) => {
          if (error.statusCode === 403) {
            this.route.navigate(['/home']);
          }
        }
      );
    } else {
      this.route.navigate(['/home']);
    }
  }
}
