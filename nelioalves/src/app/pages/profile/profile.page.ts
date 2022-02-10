import { API_CONFIG } from './../../../config/api.config';
import { ClientDTO } from './../../../models/client.dto';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClientService } from 'src/services/domain/client.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  client: ClientDTO;

  constructor(
    private storageService: StorageService,
    private clientService: ClientService
  ) {}

  getImageBucketUrl() {
    this.clientService.getImageFromBucket(this.client.id).subscribe(
      (response) => {
        this.client.imageUrl = `${API_CONFIG.bucketBaseUr}/cp${this.client.id}.jpg`;
      },
      (error) => {}
    );
  }

  ngOnInit() {
    const localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.client = response;
          this.getImageBucketUrl();
        },
        (error) => {}
      );
    }
  }
}
