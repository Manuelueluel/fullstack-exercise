import { Directive, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { StudentService } from '../student.service';
import { Observable, distinctUntilChanged, map } from 'rxjs';
import { StudentActions } from '../store/student.actions';

@Injectable({ providedIn: 'root' })
export class MatricolaSuggestionsValidator implements AsyncValidator {
  constructor(private studentService: StudentService, private store: Store) {}

  /**
   *  La validazione del campo dell'input viene fatta confrontandola con i valori che
   * vengono fetched dal backend, se combaciano allora valida l'input
   * { matricolaInvalid: { value: control.value } } altrimenti
   * @param control
   * @returns
   */
  validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    return this.studentService.getSuggestions(control.value).pipe(
      distinctUntilChanged(),
      map((suggestions) => {
        let found: boolean = false;

        //salvo nello store la lista degli studenti
        this.store.dispatch(
          StudentActions.suggestetedStudents({ students: suggestions })
        );

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
}

@Directive({
  selector: '[appMatricolaSuggestionsValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: MatricolaSuggestionsValidatorDirective,
      multi: true,
    },
  ],
})
export class MatricolaSuggestionsValidatorDirective implements Validator {
  constructor(
    private matricolaSuggestionsValidator: MatricolaSuggestionsValidator
  ) {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.matricolaSuggestionsValidator.validate(control);
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
