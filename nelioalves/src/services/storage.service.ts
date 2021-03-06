import { Injectable } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';
import { STORAGE_KEYS } from 'src/config/storege.keys.config';
import { Cart } from 'src/models/cart';
import { LocalUser } from 'src/models/local.user';

@Injectable()
export class StorageService {
  getLocalUser(): LocalUser {
    const user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (user === null) {
      return;
    }
    return JSON.parse(user);
  }

  setLocalUser(object: LocalUser) {
    if (object === null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
      return;
    }
    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(object));
  }

  getCart(): Cart {
    const cart = localStorage.getItem(STORAGE_KEYS.cart);
    if (cart === null) {
      return null;
    }
    return JSON.parse(cart);
  }

  setCart(object: Cart) {
    if (object === null) {
      localStorage.removeItem(STORAGE_KEYS.cart);
      return null;
    }
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(object));
  }
}
