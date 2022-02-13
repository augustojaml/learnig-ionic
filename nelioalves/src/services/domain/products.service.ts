import { Observable } from 'rxjs';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';

@Injectable()
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  findByCategories(
    categoryId: string,
    page: number = 0,
    linesPerPage: number = 24
  ) {
    return this.httpClient.get(
      `${API_CONFIG.baseUrl}/products?categories=${categoryId}&page=${page}&linesPerPage=${linesPerPage}`
    );
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    const bucketUrl = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.httpClient.get(bucketUrl, { responseType: 'blob' });
  }

  findById(id: string): Observable<ProductDTO> {
    return this.httpClient.get<ProductDTO>(
      `${API_CONFIG.baseUrl}/products/${id}`
    );
  }
}
