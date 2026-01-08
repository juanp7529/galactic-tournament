import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html',
})
export class Modal {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Output() onClose = new EventEmitter<void>();

  handleClose() {
    this.onClose.emit();
  }

  handleContentClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
