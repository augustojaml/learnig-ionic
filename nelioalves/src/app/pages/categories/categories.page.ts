import { API_CONFIG } from './../../../config/api.config';
import { CategoryDTO } from './../../../models/category.dto';
import { CategoriesService } from '../../../services/domain/categories.service';
import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: CategoryDTO[] = [];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  showProducts(category: CategoryDTO) {
    this.router.navigate(['/product', { id: category.id }]);
  }

  ngOnInit() {
    this.categoriesService.findAll().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {}
    );
  }
}
