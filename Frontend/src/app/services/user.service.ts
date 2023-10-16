import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: number | null = null;

  constructor(private configService: ConfigService, private http: HttpClient) { }

  setUserId(userId: number) {
    this.userId = userId;
  }

  clearUserId(): void{
    this.userId = null;
  }

  getUserId(): number | null {
    return this.userId;
  }

  getUserFullName(): Observable<any> {
    return this.http.get(`${this.configService.getApiBaseUrl()}/api/users/get-full-name?userId=${this.getUserId()}`);
  }
}
