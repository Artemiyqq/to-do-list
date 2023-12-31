import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TopPanelService } from '../services/top-panel.service';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent {
  userFullName: string = '';
  showDropdown: boolean = false;

  @Output() categoryButtonClick = new EventEmitter<string>();

  constructor(private userService: UserService,
              private router: Router,
              public topPanelService: TopPanelService) {
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnInit(): void {
    if (this.userService.getUserId() != null) {
      this.userService.getUserFullName().subscribe({
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
      console.log("Having problems with user id.");
    }
  }

  onDocumentClick(event: MouseEvent) {
    const isAccountButton = (event.target as HTMLElement).classList.contains('account-button');
    const isDropdownContent = (event.target as HTMLElement).closest('.dropdown-content');

    if (!isAccountButton && !isDropdownContent) {

      this.showDropdown = false;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.userService.clearUserId();
    this.router.navigate(['/auth']);
  }

  changeActiveCategory(category: string) {
    this.topPanelService.setActiveCategory(category);
    this.categoryButtonClick.emit(category);
  }
}
