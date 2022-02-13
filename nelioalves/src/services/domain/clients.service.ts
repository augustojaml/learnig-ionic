import { ImageUtilService } from './../Image-util-service';
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
    public storageService: StorageService,
    private imageUtilService: ImageUtilService
  ) {}

  findByEmail(email: string): Observable<any> {
    return this.httpClient.get<any>(
      `${API_CONFIG.baseUrl}/clients/email?value=${email}`
    );
  }

  findById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${API_CONFIG.baseUrl}/clients/${id}`);
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

  uploadPicture(picture: any) {
    const pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    const formData: FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.httpClient.post(
      `${API_CONFIG.baseUrl}/clients/picture`,
      formData,
      {
        observe: 'response',
        responseType: 'text',
      }
    );
  }
}
