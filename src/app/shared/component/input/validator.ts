import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function requiredValid(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return { 'message': '必填欄位' };
    }
    return null;
  };
}

export function minMaxLengthValid(minLength: number, maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const regex = new RegExp(`^[a-zA-Z0-9]{${minLength},${maxLength}}$`);
    if (!regex.test(value)) {
      return { 'message': '輸入長度不符合規則' };
    }
    return null;
  };
}
