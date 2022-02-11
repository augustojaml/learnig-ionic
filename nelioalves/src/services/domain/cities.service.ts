import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityDTO } from 'src/models/city.dto';

import { API_CONFIG } from './../../config/api.config';

@Injectable()
export class CitiesService {
  constructor(public http: HttpClient) {}

  findAll(stateId: string): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>(
      `${API_CONFIG.baseUrl}/states/${stateId}/cities`
    );
  }
}
