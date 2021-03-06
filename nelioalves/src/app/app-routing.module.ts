import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('../pages/categories/categories.module').then(
        (m) => m.CategoriesPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../pages/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('../pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('../pages/product/product.module').then(
        (m) => m.ProductPageModule
      ),
  },
  {
    path: 'product-detail',
    loadChildren: () =>
      import('../pages/product-detail/product-detail.module').then(
        (m) => m.ProductDetailPageModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../pages/cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'pick-address',
    loadChildren: () =>
      import('../pages/pick-address/pick-address.module').then(
        (m) => m.PickAddressPageModule
      ),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('../pages/payment/payment.module').then(
        (m) => m.PaymentPageModule
      ),
  },
  {
    path: 'order-confirmation',
    loadChildren: () =>
      import('../pages/order-confirmation/order-confirmation.module').then(
        (m) => m.OrderConfirmationPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
