import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const matricolaValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const nameRegex: RegExp = new RegExp(/[^\d]+/);
  const notValid = nameRegex.test(control.value);
  return notValid ? { matricolaInvalid: { value: control.value } } : null;
};

@Directive({
  selector: '[appMatricolaValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatricolaValidatorDirective,
      multi: true,
    },
  ],
})
export class MatricolaValidatorDirective implements Validator {
  @Input('appMatricolaValidator') matricolaValidator = '';

  constructor() {}
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.matricolaValidator ? matricolaValidator(control) : null;
    // return matricolaValidator(control);
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}

// export class MatricolaValidatorDirective implements Validator {
//   @Input('appMatricolaValidator') matricolaValidator = '';

//   constructor() {}
//   validate(control: AbstractControl<any, any>): ValidationErrors | null {
//     return this.matricolaValidator ? matricolaValidator(control) : null;
//     // return matricolaValidator(control);
//   }
//   registerOnValidatorChange?(fn: () => void): void {
//     throw new Error('Method not implemented.');
//   }
// }
