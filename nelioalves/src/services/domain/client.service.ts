import { API_CONFIG } from './../../config/api.config';
import { ClientDTO } from './../../models/client.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable()
export class ClientService {
  constructor(
    public httpClient: HttpClient,
    public storageService: StorageService
  ) {}

  findByEmail(email: string): Observable<ClientDTO> {
    return this.httpClient.get<ClientDTO>(
      `${API_CONFIG.baseUrl}/clients/email?value=${email}`
    );
  }

  getImageFromBucket(id: string): Observable<any> {
    const bucketUrl = `${API_CONFIG.bucketBaseUr}/cp${id}.jpg`;
    return this.httpClient.get(bucketUrl, { responseType: 'blob' });
  }
}
