import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() cusHidn: boolean = false;
  @Input() placeHolder: string = '';
  @Input() showInfoIcon: boolean = true;
  @Output() infoEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() hideEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() formGroup!: FormGroup;
  @Input() formControlName: string = '';

  formControl: FormControl = new FormControl();

  inputType: string = 'password';

  txHidden: boolean = true;

  value: string = '';

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    this.value = value;
    this.formControl = this.formGroup.get(this.formControlName) as FormControl;
    console.log(this.formControl.dirty);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  setValue(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.formGroup.get(this.formControlName)?.setValue(this.value);
    this.formGroup.get(this.formControlName)?.markAsDirty();
  }

  get controls(): FormControl {
    return this.formGroup.get(this.formControlName) as FormControl;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.cusHidn) {
      this.customHide();
    }
  }

  switchType(): void {
    this.txHidden = !this.txHidden;
    if(!this.cusHidn) {
      this.inputType = this.txHidden ? 'password' : 'text';
    } else {
      this.customHide();
    }
  }

  openAcconutInfo():void {
    this.infoEvent.emit();
  }

  customHide(): void {
    this.hideEvent.emit(this.txHidden);
  }
}
