import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null; // Allow empty values
    }

    const num = Number(value);
    if (isNaN(num) || !Number.isInteger(num)) {
      return { integer: true };
    }

    return null;
  };
}
