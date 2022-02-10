import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CredentialDTO } from 'src/models/credential.dto';
import { LocalUser } from 'src/models/local.user';
@Injectable()
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  authenticate(credential: CredentialDTO) {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, credential, {
      observe: 'response',
      responseType: 'text',
    });
  }

  successFulLogin(bearerToken: string) {
    const token = bearerToken.substring(7);
    const user: LocalUser = {
      token,
    };
    this.storageService.setLocalUser(user);
  }

  logout() {
    this.storageService.setLocalUser(null);
  }
}
