import { Component, OnInit } from '@angular/core';
import { AddressDTO } from 'src/models/address.dto';
import { PurchaseDTO } from 'src/models/purchase.dto';
import { CartsService } from 'src/services/domain/carts.service';
import { ClientsService } from 'src/services/domain/clients.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {
  addresses: AddressDTO[] = [];

  purchase: PurchaseDTO;

  constructor(
    private storageService: StorageService,
    private clientsService: ClientsService,
    private cartsService: CartsService
  ) {}

  nextPage(address: AddressDTO) {
    this.purchase.shippingAddress = { id: address.id };
    console.log(this.purchase);
  }

  ngOnInit() {
    const localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clientsService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.addresses = response?.addresses;

          let cart = this.cartsService.getCart();

          this.purchase = {
            client: { id: response?.id },
            shippingAddress: null,
            payment: null,
            items: cart.itemsCarts.map((item) => {
              return {
                quantity: item.quantity,
                product: { id: item.product.id },
              };
            }),
          };
        },
        (error) => {}
      );
    }
  }
}
