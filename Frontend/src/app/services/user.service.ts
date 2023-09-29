import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseurl = '';
  private userId: number | null = null;

  constructor(private http: HttpClient) { }

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
    return this.http.get(`${this.apiBaseurl}/api/users/get-full-name?userId=${this.getUserId()}`);
  }
}
