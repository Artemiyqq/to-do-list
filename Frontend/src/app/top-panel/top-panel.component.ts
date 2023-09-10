import { Component } from '@angular/core';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent {
  activeCategory: string = 'All';

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }  
}
