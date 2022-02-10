import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { CredentialDTO } from 'src/models/credential.dto';
import { LocalUser } from 'src/models/local.user';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

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
      email: this.jwtHelper.decodeToken(token).sub,
    };
    this.storageService.setLocalUser(user);
  }

  logout() {
    this.storageService.setLocalUser(null);
  }
}
