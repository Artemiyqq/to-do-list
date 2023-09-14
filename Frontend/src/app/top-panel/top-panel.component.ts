import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent {
  activeCategory: string = 'All';

  userFullName: string = '';

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userEmail = this.userService.getLoginEmail();
    if (userEmail != null) {
      this.userService.getUserFullName(userEmail).subscribe({
        next: (nameResponse) => {
          if (nameResponse.fullName) {
            this.userFullName = nameResponse.fullName;
          }
        },
        error: (error) => {
          console.error("Some error with getting full name happend:", error);
        }
      });
    }
    else {
      console.log("Having problems with user email.");
    }
  }
}
