import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { corsoValidator } from '../custom-validators/corso-validator.directive';
import { nameValidator } from '../custom-validators/name-validator.directive';

@Component({
  selector: 'app-form-corso',
  templateUrl: './form-corso.component.html',
  styleUrls: ['./form-corso.component.css'],
})
export class FormCorsoComponent implements OnInit {
  form!: FormGroup;
  @Input() title!: string;
  @Output() notify = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  //Definizione del form
  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, corsoValidator])
      ),
      professore: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, nameValidator])
      ),
    });
  }

  get nome() {
    return this.form.get('nome')!;
  }

  get professore() {
    return this.form.get('professore')!;
  }

  //Invia evento al parent
  // sendEvent(corso: string[]) {
  //   this.notify.emit(corso);
  // }

  onSubmit() {
    this.notify.emit([this.form.value.nome, this.form.value.professore]);
    this.form.reset();
  }
}
