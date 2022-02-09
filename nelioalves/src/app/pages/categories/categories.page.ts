import { CategoriesService } from '../../../services/domain/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.findAll().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
