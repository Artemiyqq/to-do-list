import { Component } from '@angular/core';
import { LoginDto } from '../models/login-dto.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  loginData: LoginDto | null = null;
  showAddTaskButton: boolean = true;
  isTaskCreateModalVisible: boolean = false;

  constructor(private userService: UserService) {}

  showTaskCreateModal() {
    this.isTaskCreateModalVisible = true;
    this.showAddTaskButton = false;
  }

  hideTaskCreateModal() {
    this.isTaskCreateModalVisible = false;
    this.showAddTaskButton = true;
  }

  onCategoryButtonClick(activeCategory: string) {
    if (activeCategory !== 'All') {
        this.showAddTaskButton = false;
    } else {
        this.showAddTaskButton = true;
    }
}
}
