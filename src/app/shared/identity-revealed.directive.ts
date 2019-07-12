import {Directive} from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appIdentityRevealed]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IdentityRevealedValidatorDirective, multi: true }]
})
export class IdentityRevealedValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return identityRevealedValidator(control);
  }
}

// возвращает ошибку 'identityRevealed'
export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
console.log('password: ', password);
// console.log('password.value: ', password.value);
console.log('confirmPassword: ', confirmPassword);
// console.log('confirmPassword.value: ', confirmPassword.value);
  let result = password && confirmPassword && password.value === confirmPassword.value;
  console.log('result', result);
  let result2 = result ? null  : { 'identityRevealed': true };
  return  result2;
};
