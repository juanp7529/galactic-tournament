import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../../shared/components/ui/button/button';

@Component({
  selector: 'app-winner-modal',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './winner-modal.html',
})
export class WinnerModal {
  @Input() isOpen: boolean = false;
  @Input() winnerName: string = '';
  @Output() onClose = new EventEmitter<void>();

  handleClose() {
    this.onClose.emit();
  }
}
