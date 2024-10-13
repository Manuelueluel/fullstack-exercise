import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IscrizioneService } from '../iscrizione.service';
import { nameValidator } from '../custom-validators/name-validator.directive';
import { corsoValidator } from '../custom-validators/corso-validator.directive';
import { Observable, Subscription, map } from 'rxjs';
import { CorsoService } from '../corso.service';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { MatricolaSuggestionsValidator } from '../custom-validators/matricola-suggestions-validator.directive';
import { Store } from '@ngrx/store';
import { suggestetedMatricola } from '../store/student.selectors';

@Component({
  selector: 'app-iscrizione-student',
  templateUrl: './iscrizione-student.component.html',
  styleUrls: ['./iscrizione-student.component.css'],
})
export class IscrizioneStudentComponent implements OnDestroy, OnInit {
  @Input() title!: string;
  form: any;

  matricolaSuggestionSubscription!: Subscription;
  matricolaSuggestions!: string[];

  corsiSuggestionSubscription!: Subscription;
  corsiSuggestions!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private iscrizioneService: IscrizioneService,
    private corsoService: CorsoService,
    private studentService: StudentService,
    public matricolaSuggestionsValidator: MatricolaSuggestionsValidator,
    private store: Store
  ) {}

  ngAfterViewInit() {
    //Gli event listener a componenti vanno inizialzzati qui
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      matricola: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [
          this.matricolaSuggestionsValidator.validate.bind(
            this.matricolaSuggestionsValidator
          ),
        ],
      }),
      nome: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, nameValidator])
      ),
      cognome: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, nameValidator])
      ),
      corso: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, corsoValidator])
      ),
      professor: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, nameValidator])
      ),
    });

    //Fetch suggerimenti nomi dei corsi
    this.corsiSuggestions = [];
    this.corsiSuggestionSubscription = this.corsoService
      .getCorsi()
      .subscribe((corsi) => {
        corsi.forEach((corso) => {
          this.corsiSuggestions.push(corso.name);
        });
      });

    //Fetch suggerimenti matricole dallo store
    this.matricolaSuggestions = [];
    this.matricolaSuggestionSubscription = this.store
      .select(suggestetedMatricola)
      .subscribe((matricole) => {
        this.matricolaSuggestions = [];
        matricole.forEach((matricola) => {
          this.matricolaSuggestions.push(matricola);
        });
      });
  }

  fetchMatricolaSuggestions(value: string): Observable<string[]> {
    return this.studentService.getSuggestions(+value).pipe(
      //debounceTime(2000),
      //studentService.getSuggestions retorna un tipo Observable<Student[]>, tale observable emette array di student
      //è possibile modificare il tipo returnato se nella pipe si va a modificare gli array emessi
      //mappo su ogni array di student una mappa che per student preleva solamente la matricola string, avendo così string[]
      //come return
      map((students: Student[]) => {
        return students.map((student: Student) => `${student.matricola}`);
      })
    );
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

  get corso() {
    return this.form.get('corso');
  }

  get professore() {
    return this.form.get('professor');
  }

  onSubmit() {
    const studentCorso = {
      student: {
        matricola: this.form.value.matricola,
        nome: this.form.value.nome,
        cognome: this.form.value.cognome,
      },
      corso: {
        name: this.form.value.corso,
        professor: this.form.value.professor,
      },
    };

    this.iscrizioneService.iscriviStudente(studentCorso).subscribe();
  }

  ngOnDestroy(): void {
    this.corsiSuggestionSubscription.unsubscribe();
    this.matricolaSuggestionSubscription.unsubscribe();
  }
}
