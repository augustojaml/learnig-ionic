import { API_CONFIG } from 'src/config/api.config';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from '../../models/product.dto';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/domain/products.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  products: ProductDTO[] = [];
  isLoading = true;

  categoriesId: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  getCategoryId() {
    const loading = this.presentLoading();
    this.productsService
      .findByCategories(this.activeRoute.snapshot.params.id)
      .subscribe(
        ({ content }: any) => {
          this.products = content;
          this.loadingImageUrl();
          loading.then((load) => {
            load.dismiss();
            this.isLoading = false;
          });
        },
        (error) => {
          loading.then((load) => {
            load.dismiss();
            this.isLoading = false;
          });
        }
      );
  }

  loadingImageUrl() {
    for (let i = 0; i < this.products.length; i++) {
      let product = this.products[i];
      this.productsService.getSmallImageFromBucket(product.id).subscribe(
        (response) => {
          product.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${product.id}-small.jpg`;
        },
        (error) => {}
      );
    }
  }

  handleProductDetail(product: ProductDTO) {
    this.router.navigate(['/product-detail', { id: product.id }]);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde...',
    });
    await loading.present();
    return loading;
  }

  ngOnInit() {
    this.getCategoryId();
  }
}
