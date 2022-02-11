import { Observable } from 'rxjs';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  findByCategories(categoryId: string) {
    return this.httpClient.get(
      `${API_CONFIG.baseUrl}/products?categories=${categoryId}`
    );
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    const bucketUrl = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.httpClient.get(bucketUrl, { responseType: 'blob' });
  }
}
