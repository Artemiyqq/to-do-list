import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-create-modal',
  templateUrl: './task-create-modal.component.html',
  styleUrls: ['./task-create-modal.component.css']
})
export class TaskCreateModalComponent {
  @Input() isVisible: boolean = false;

  @Output() closeModalEvent = new EventEmitter<void>();

  closeTaskModal() {
    this.closeModalEvent.emit();
  }

  createTask() {
    this.closeTaskModal();
  }
}
