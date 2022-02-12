import { Component, OnInit } from '@angular/core';
import { AddressDTO } from 'src/models/address.dto';
import { ClientsService } from 'src/services/domain/clients.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {
  addresses: AddressDTO[] = [];

  constructor(
    private storageService: StorageService,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    const localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clientsService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.addresses = response?.addresses;
        },
        (error) => {}
      );
    }
  }
}
