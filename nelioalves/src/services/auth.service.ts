import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CredentialDTO } from 'src/models/credential.dto';
@Injectable()
export class AuthService {
  constructor(public http: HttpClient) {}

  authenticate(credential: CredentialDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, credential, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
