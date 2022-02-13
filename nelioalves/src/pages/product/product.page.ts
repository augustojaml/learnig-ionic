import { API_CONFIG } from 'src/config/api.config';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from '../../models/product.dto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/services/domain/products.service';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  products: ProductDTO[] = [];
  isLoading = true;

  categoriesId: string = '';

  page: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  getCategoryId() {
    const loading = this.presentLoading();
    this.productsService
      .findByCategories(this.activeRoute.snapshot.params.id, this.page, 12)
      .subscribe(
        ({ content }: any) => {
          let start = this.products.length;
          this.products = this.products.concat(content);
          let end = this.products.length - 1;
          loading.then((load) => {
            load.dismiss();
            this.isLoading = false;
          });
          this.loadingImageUrl(start, end);
        },
        (error) => {
          loading.then((load) => {
            load.dismiss();
            this.isLoading = false;
          });
        }
      );
  }

  loadingImageUrl(start: number, end: number) {
    for (let i = start; i <= end; i++) {
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

  doRefresh(event: any) {
    this.infiniteScroll.disabled = false;
    this.page = 0;
    this.products = [];
    setTimeout(() => {
      this.getCategoryId();
      event.target.complete();
    }, 1000);
  }

  loadData(event: any) {
    event.target.disabled = false;
    this.page++;
    this.getCategoryId();
    setTimeout(() => {
      this.infiniteScroll.disabled = true;
    }, 2000);
  }

  ngOnInit() {
    this.getCategoryId();
  }
}
