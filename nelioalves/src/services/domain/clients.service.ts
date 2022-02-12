import { API_CONFIG } from './../../config/api.config';
import { ClientDTO } from './../../models/client.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable()
export class ClientsService {
  constructor(
    public httpClient: HttpClient,
    public storageService: StorageService
  ) {}

  findByEmail(email: string): Observable<any> {
    return this.httpClient.get<any>(
      `${API_CONFIG.baseUrl}/clients/email?value=${email}`
    );
  }

  getImageFromBucket(id: string): Observable<any> {
    const bucketUrl = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.httpClient.get(bucketUrl, { responseType: 'blob' });
  }

  insert(clientDTO: ClientDTO) {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/clients`, clientDTO, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
