import { Component } from '@angular/core';
import { LoginDto } from '../models/login-dto.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  loginData: LoginDto | null = null;
  isTaskCreateModalVisible: boolean = false;

  constructor(private userService: UserService) {
    this.loginData = userService.getLoginData();
  }

  showTaskCreateModal() {
    this.isTaskCreateModalVisible = true;
  }

  hideTaskCreateModal() {
    this.isTaskCreateModalVisible = false;
  }
}
