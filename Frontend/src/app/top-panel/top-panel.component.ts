import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent {
  activeCategory: string = 'All';
  userFullName: string = '';
  showDropdown: boolean = false;

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }

  constructor(private userService: UserService, private router: Router) {
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

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

  onDocumentClick(event: MouseEvent) {
    // Check if the click target is not the account button or the dropdown content
    const isAccountButton = (event.target as HTMLElement).classList.contains('account-button');
    const isDropdownContent = (event.target as HTMLElement).closest('.dropdown-content');

    if (!isAccountButton && !isDropdownContent) {
      // Clicked outside the account button and dropdown content, close the dropdown
      this.showDropdown = false;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // You can add a logout method here as well if needed
  logout() {
    this.userService.deleteLoginData();
    this.router.navigate(['/auth']);
  }
}
