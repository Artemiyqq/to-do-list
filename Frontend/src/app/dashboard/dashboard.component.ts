import { Component } from '@angular/core';
import { LoginDto } from '../models/login-dto.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  loginData: LoginDto | null = null;

  constructor(private authService: AuthService){
    this.loginData = authService.getLoginData();
  }
}
