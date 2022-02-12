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

  removeProductCart(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.itemsCarts.findIndex(
      (cart) => cart.product.id === product.id
    );
    if (position !== -1) {
      cart.itemsCarts.splice(position, 1);
    }
    this.storageService.setCart(cart);
    return cart;
  }

  increaseQuantityProductCart(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.itemsCarts.findIndex(
      (cart) => cart.product.id === product.id
    );
    if (position !== -1) {
      cart.itemsCarts[position].quantity++;
    }
    this.storageService.setCart(cart);
    return cart;
  }

  decreaseQuantityProductCart(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.itemsCarts.findIndex(
      (cart) => cart.product.id === product.id
    );
    if (position !== -1) {
      cart.itemsCarts[position].quantity--;
      if (cart.itemsCarts[position].quantity === 0) {
        cart = this.removeProductCart(product);
      }
    }
    this.storageService.setCart(cart);
    return cart;
  }

  totalProductCart(): number {
    let cart = this.getCart();
    let sum = 0;
    for (var i = 0; i < cart.itemsCarts.length; i++) {
      sum += cart.itemsCarts[i].product.price * cart.itemsCarts[i].quantity;
    }
    return sum;
  }
}
