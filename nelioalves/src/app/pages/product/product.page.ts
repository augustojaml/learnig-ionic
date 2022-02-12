import { API_CONFIG } from 'src/config/api.config';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from './../../../models/product.dto';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/domain/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  products: ProductDTO[] = [];

  categoriesId: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  getCategoryId() {
    this.productsService
      .findByCategories(this.activeRoute.snapshot.params.id)
      .subscribe(
        ({ content }: any) => {
          this.products = content;
          this.loadingImageUrl();
        },
        (error) => {}
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

  ngOnInit() {
    this.getCategoryId();
  }
}
