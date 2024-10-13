import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Observable, distinctUntilChanged, map } from 'rxjs';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent
  implements ControlValueAccessor, AsyncValidator
{
  value!: string;
  disabled: boolean = false;
  onChange: any = (value: any) => {};
  onTouched: any = () => {};
  suggestions!: string[] | (() => string[]);

  constructor(private studentService: StudentService) {}

  // getSuggestions( suggestions: string[] | (() => string[])){
  //   this.suggestions = suggestions;
  // }

  validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    return this.studentService.getSuggestions(control.value).pipe(
      distinctUntilChanged(),
      map((suggestions) => {
        let found: boolean = false;

        for (let suggestion of suggestions) {
          if (suggestion.matricola === control.value) found = true;
        }

        return found ? null : { matricolaInvalid: { value: control.value } };
      })
    );
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
