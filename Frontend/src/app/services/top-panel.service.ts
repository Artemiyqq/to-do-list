import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TopPanelService {
    private activeCategory: string = 'All';

    setActiveCategory(category: string) {
        this.activeCategory = category;
    }
    
    getActiveCategory(): string {
        return this.activeCategory;
    }
}
