import { API_CONFIG } from './../../../config/api.config';
import { CategoryDTO } from './../../../models/category.dto';
import { CategoriesService } from '../../../services/domain/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: CategoryDTO[] = [];
  bucketUrl: string = API_CONFIG.bucketBaseUr;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.findAll().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {}
    );
  }
}
