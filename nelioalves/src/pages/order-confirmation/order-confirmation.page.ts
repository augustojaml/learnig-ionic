import { AddressDTO } from './../../models/address.dto';
import { ClientsService } from 'src/services/domain/clients.service';
import { ClientDTO } from './../../models/client.dto';
import { CartItem } from './../../models/cart-item';
import { CartsService } from 'src/services/domain/carts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseDTO } from 'src/models/purchase.dto';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {
  purchase: PurchaseDTO;
  cartItem: CartItem[];
  client: ClientDTO;
  address: AddressDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cartsService: CartsService,
    private clientsService: ClientsService,
    private router: Router
  ) {}

  private findAddress(addresses: AddressDTO[], id: string): AddressDTO {
    return addresses.find((address) => address.id === id);
  }

  total() {
    return this.cartsService.totalProductCart();
  }

  ngOnInit() {
    this.purchase = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('purchase')
    );
    this.cartItem = this.cartsService.getCart().itemsCarts;
    this.clientsService.findById(this.purchase.client.id).subscribe(
      (response) => {
        this.client = response as ClientDTO;
        this.address = this.findAddress(
          response.addresses,
          this.purchase.shippingAddress.id
        );
      },
      (error) => {
        this.router.navigate(['/home']);
      }
    );
  }
}
