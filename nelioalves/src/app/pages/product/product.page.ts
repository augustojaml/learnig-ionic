import { ProductDTO } from './../../../models/product.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  products: ProductDTO[] = [];

  constructor() {}

  ngOnInit() {
    this.products = [
      {
        id: '1',
        name: 'Mouse',
        price: 80.99,
      },
      {
        id: '2',
        name: 'Teclado',
        price: 124.0,
      },
      {
        id: '3',
        name: 'Mouse Pad',
        price: 30.0,
      },
    ];
  }
}
