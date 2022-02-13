import { API_CONFIG } from '../../config/api.config';
import { ClientDTO } from '../../models/client.dto';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClientsService } from 'src/services/domain/clients.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  client: ClientDTO;
  picture: string;
  cameraON: boolean = false;

  constructor(
    private storageService: StorageService,
    private clientsService: ClientsService,
    private route: Router,
    private camera: Camera
  ) {}

  getImageBucketUrl() {
    this.clientsService.getImageFromBucket(this.client.id).subscribe(
      (response) => {
        this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`;
      },
      (error) => {}
    );
  }

  getPicture() {
    this.cameraON = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.picture = 'data:image/png;base64,' + imageData;
        console.log(this.picture);
        this.cameraON = false;
      },
      (err) => {
        // Handle error
      }
    );
  }

  sendPicture() {
    this.clientsService.uploadPicture(this.picture).subscribe(
      (response) => {
        this.picture = null;
        this.loadData();
      },
      (error) => {}
    );
  }

  cancel() {
    this.picture = null;
  }

  loadData() {
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

  ngOnInit() {
    this.loadData();
  }
}
