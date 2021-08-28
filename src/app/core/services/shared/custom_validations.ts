import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';

// regex
const validPhone = /\d{9,}/;
const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
const validNumber = /^\d+$/;
const validateYear = (new Date()).getFullYear() ;

// create your class that extends the angular validator class
export class CustomValidators extends Validators {

  static validateEmail(control: FormControl) {
    return validEmail.test(control.value) ? null : { email: true };
  }

  static validatePhone(control: FormControl) {

    return validPhone.test(control.value) ? null : { validPhone: true };
  }

  static validateIfIsNumber(control: FormControl) {

    return validNumber.test(control.value) ? null : { validNumber: true };
  }

  static validateYear(control: FormControl) {
    console.log(1);
    return (control.value <= validateYear) ? null : { validateYear: true };
  }

}
