import { API_CONFIG } from 'src/config/api.config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from 'src/models/product.dto';
import { ProductsService } from 'src/services/domain/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  productDetail: ProductDTO = {
    id: '',
    name: '',
    price: 0,
  };

  constructor(
    private productsService: ProductsService,
    private activeRoute: ActivatedRoute
  ) {}

  getImageUrlIfExists() {
    this.productsService
      .getSmallImageFromBucket(this.productDetail.id)
      .subscribe((response) => {
        this.productDetail.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.productDetail.id}.jpg`;
      });
  }

  ngOnInit() {
    this.productsService
      .findById(this.activeRoute.snapshot.params.id)
      .subscribe(
        (response) => {
          this.productDetail = response;
          this.getImageUrlIfExists();
        },
        (error) => {}
      );
  }
}
//`${API_CONFIG.bucketBaseUrl}/prod${this.productDetail.id}-small.jpg`
