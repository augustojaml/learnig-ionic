import { ProductDTO } from './../../models/product.dto';
import { Injectable } from '@angular/core';
import { Cart } from 'src/models/cart';
import { StorageService } from '../storage.service';

@Injectable()
export class CartsService {
  constructor(public storageService: StorageService) {}

  createOrClearCart(): Cart {
    const cart: Cart = { itemsCarts: [] };
    this.storageService.setCart(cart);
    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storageService.getCart();
    if (!cart) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProductToCart(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.itemsCarts.findIndex(
      (cart) => cart.product.id === product.id
    );
    if (position === -1) {
      cart.itemsCarts.push({ quantity: 1, product: product });
    }
    this.storageService.setCart(cart);
    return cart;
  }
}
