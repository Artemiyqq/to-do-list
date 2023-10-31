import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiBaseUrl = '';

  getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }
}
