import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from './models/login-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseurl = '';
  private loginData: LoginDto | null = null;

  constructor(private http: HttpClient) { }

  setLoginData(data: LoginDto) {
    this.loginData = data;
  }

  getLoginData(): LoginDto | null {
    return this.loginData;
  }

  getLoginEmail(): string | null {
    if (this.loginData != null) {
      return this.loginData.email;
    }
    return null;
  }

  getUserFullName(email: string): Observable<any> {
    return this.http.get(`${this.apiBaseurl}/api/users/get-full-name?email=${email}`);
  }
}
