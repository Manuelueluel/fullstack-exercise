import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const corsoValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const nameRegex: RegExp = new RegExp(/[^a-zA-Z\d\s]+/);
  const notValid = nameRegex.test(control.value);
  return notValid ? { corsoInvalid: { value: control.value } } : null;
};

@Directive({
  selector: '[appCorsoValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CorsoValidatorDirective,
      multi: true,
    },
  ],
})
export class CorsoValidatorDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return corsoValidator(control);
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
