import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  email: string;

  constructor(private storageService: StorageService) {}

  ngOnInit() {}
}
