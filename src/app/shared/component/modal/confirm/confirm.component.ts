import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
  @Output() closeEvent = new EventEmitter<boolean>();

  constructor(@Inject(DIALOG_DATA) public data: any) {}

  close(value: boolean) {
    this.closeEvent.emit(value);
  }
}
