import { Observable } from 'rxjs';
import { PurchaseDTO } from './../../models/purchase.dto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class PurchasesService {
  constructor(public httpClient: HttpClient) {}

  insert(purchase: PurchaseDTO): Observable<HttpResponse<string>> {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/purchases`, purchase, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
