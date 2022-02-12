import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cart-item';
import { ProductsService } from 'src/services/domain/products.service';
import { API_CONFIG } from 'src/config/api.config';
import { CartsService } from 'src/services/domain/carts.service';
import { ProductDTO } from 'src/models/product.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItem: CartItem[] = [];

  constructor(
    private cartsService: CartsService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  loadingImageUrl() {
    for (let i = 0; i < this.cartItem?.length; i++) {
      let item = this.cartItem[i];
      this.productsService.getSmallImageFromBucket(item.product.id).subscribe(
        (response) => {
          item.product.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.product.id}-small.jpg`;
        },
        (error) => {}
      );
    }
  }

  removeItem(product: ProductDTO) {
    this.cartItem = this.cartsService.removeProductCart(product).itemsCarts;
  }

  increaseQuantityCart(product: ProductDTO) {
    this.cartItem =
      this.cartsService.increaseQuantityProductCart(product).itemsCarts;
  }

  decreaseQuantityCart(product: ProductDTO) {
    this.cartItem =
      this.cartsService.decreaseQuantityProductCart(product).itemsCarts;
  }

  totalQuantityCart(): number {
    return this.cartsService.totalProductCart();
  }

  ngOnInit() {
    let cart = this.cartsService.getCart();
    this.cartItem = cart?.itemsCarts;
    this.loadingImageUrl();
  }
}
