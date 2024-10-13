import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const nameValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const nameRegex: RegExp = new RegExp(/[^a-zA-Z\s]+/);
  const notValid = nameRegex.test(control.value);
  return notValid ? { nameInvalid: { value: control.value } } : null;
  /* nameInvalid è il nome dell'errore a cui nel template è necessario fare riferimento
  come per esempio <div *ngIf="nome.errors?.['nameInvalid']">Nome is invalid.</div> */
};

@Directive({
  selector: '[appNameValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NameValidatorDirective,
      multi: true,
    },
  ],
})
export class NameValidatorDirective implements Validator {
  @Input('appNameValidator') nameValidator = '';

  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.nameValidator ? nameValidator(control) : null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
