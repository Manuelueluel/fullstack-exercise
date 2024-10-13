import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { nameValidator } from '../custom-validators/name-validator.directive';
import { matricolaValidator } from '../custom-validators/matricola-validator.directive';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.css'],
})
export class FormStudentComponent implements OnInit {
  form!: FormGroup;
  @Input() title!: string;
  @Output() notify = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    //Definizione del form
    this.form = this.formBuilder.group({
      matricola: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, matricolaValidator])
      ),
      nome: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, nameValidator])
      ),
      cognome: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, nameValidator])
      ),
    });
  }

  get matricola() {
    return this.form.get('matricola')!;
  }

  get nome() {
    return this.form.get('nome')!;
  }

  get cognome() {
    return this.form.get('cognome')!;
  }

  //Invia evento al parent
  sendEvent(student: string[]) {
    this.notify.emit(student);
  }

  onSubmit() {
    this.sendEvent([
      this.form.value.matricola,
      this.form.value.nome,
      this.form.value.cognome,
    ]);
    this.form.reset();
  }
}
