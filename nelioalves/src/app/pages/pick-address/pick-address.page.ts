import { Component, OnInit } from '@angular/core';
import { AddressDTO } from 'src/models/address.dto';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {
  addresses: AddressDTO[] = [];

  constructor() {}

  ngOnInit() {
    this.addresses = [
      {
        id: '1',
        neighborhood: 'Rua Que Voce Mora',
        number: '1',
        complement: 'Centro 1',
        district: 'Bairro 1',
        zipCode: '11111111',
        city: {
          id: '1',
          name: 'City 1',
          state: {
            id: '1',
            name: 'State 1',
          },
        },
      },
      {
        id: '2',
        neighborhood: 'Rua Que Voce Mora',
        number: '2',
        complement: 'Centro 2',
        district: 'Bairro 2',
        zipCode: '22222222',
        city: {
          id: '2',
          name: 'City 2',
          state: {
            id: '2',
            name: 'State 2',
          },
        },
      },
    ];
  }
}
