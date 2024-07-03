import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Output() closeEvent = new EventEmitter<void>();

  constructor(@Inject(DIALOG_DATA) public data: any) {}

  close() {
    this.closeEvent.emit();
  }
}
