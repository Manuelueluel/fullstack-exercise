import { Component, OnInit } from '@angular/core';
import { CorsoService } from '../corso.service';
import { Student } from '../student';
import { Corso } from '../corso';
import { Store } from '@ngrx/store';
import { IscrizioneService } from '../iscrizione.service';
import { selectCorsoName } from '../store/corso.selectors';
import { CorsoActions } from '../store/corso.actions';

@Component({
  selector: 'app-pagina-corso',
  templateUrl: './pagina-corso.component.html',
  styleUrls: ['./pagina-corso.component.css'],
})
export class PaginaCorsoComponent implements OnInit {
  titleCreaCorso!: string;
  titleCorsiTable!: string;
  titleModificaCorso!: string;
  titleCancellaCorso!: string;
  titleIscrizioniCorso!: string;
  titleCancellaIscrizione!: string;
  corsoTable: any;
  iscrizioniTable: any;
  showCancellareIscrizione: boolean;
  showCancellaCorso: boolean;
  showIscrizioni: boolean;
  showUpdateCorso: boolean;

  active: number = 1;
  listaIscrizioniTabDisabled: boolean = true;

  selectedStudent: Student = {
    id: -1,
    matricola: -1,
    nome: '',
    cognome: '',
  };

  selectedCorso: Corso = {
    id: -1,
    name: '',
    professor: '',
  };

  /*  Alla selezione di un corso nella tabella, quel corso viene inserito nello Store,
      sotto lo state 'corso'. Per prelevare dallo Store uno state è necessario usare
      un selector, dato che ero interessato solamente al nome del corso selezionato,
      ho utilizzato il selector per solo quella property dello state 'corso'.
      Il metodo select(selector) restituisce un Observable, in questo caso <string>
      che alla selezione del corso returna il nome del corso, così vado a modificare 
      i titoli dei vari component che utlizzavano tale nome.
  */
  nomeCorsoSelezionato$ = this.store
    .select(selectCorsoName)
    .subscribe((nomeCorso: string) => {
      this.titleModificaCorso = $localize`Modify course ${nomeCorso}`;
      this.titleCancellaCorso = $localize`Delete course ${nomeCorso}`;
      this.titleIscrizioniCorso = $localize`${nomeCorso} course enrollments`;
    });

  constructor(
    private serviceCorso: CorsoService,
    private serviceIscrizioni: IscrizioneService,
    private store: Store
  ) {
    this.corsoTable = {
      headers: [$localize`Id`, $localize`Name`, $localize`Professor`],
      rows: [],
    };

    this.iscrizioniTable = {
      headers: [
        $localize`Id`,
        $localize`Badge number`,
        $localize`Name`,
        $localize`Surname`,
      ],
      rows: [],
    };

    this.titleCreaCorso = $localize`Create course`;
    this.titleCorsiTable = $localize`Courses list`;
    this.showCancellareIscrizione = false;
    this.showCancellaCorso = false;
    this.showIscrizioni = false;
    this.showUpdateCorso = false;
  }

  ngOnInit(): void {
    this.getCorsi();
  }

  //Crea un nuovo corso dalla form
  createCorsoEvent(corso: string[]) {
    //Non è necessario l'id, generato dal backend
    const newCorso: Corso = {
      name: corso[0],
      professor: corso[1],
    };

    this.serviceCorso.createCorso(newCorso).subscribe(() => this.getCorsi());
  }

  //Seleziona un corso dalla tabella dei corsi
  selectCorsoEvent(corso: string[]) {
    this.selectedCorso.id = +corso[0];
    this.selectedCorso.name = corso[1];
    this.selectedCorso.professor = corso[2];

    this.store.dispatch(
      CorsoActions.selectCorso({ corso: this.selectedCorso })
    );

    this.showIscrizioni = true;
    this.showUpdateCorso = true;
    this.showCancellaCorso = true;
    this.listaIscrizioniTabDisabled = false;
    this.getIscrizioni(this.selectedCorso);
  }

  //Seleziona uno student dalla lista delle iscrizioni al corso selezionato
  selectStudentEvent(student: string[]) {
    this.selectedStudent.id = +student[0];
    this.selectedStudent.matricola = +student[1];
    this.selectedStudent.nome = student[2];
    this.selectedStudent.cognome = student[3];

    this.titleCancellaIscrizione = $localize`Unsubscribe ${this.selectedStudent.matricola} from course ${this.selectedCorso.name}`;

    this.showCancellareIscrizione = true;
  }

  hideCancellaCorso() {
    this.showCancellareIscrizione = false;
    this.showCancellaCorso = false;
    this.showUpdateCorso = false;
    this.showIscrizioni = false;
    this.listaIscrizioniTabDisabled = true;
  }

  hideCancellaIscrizione() {
    this.showCancellareIscrizione = false;
  }

  //fetch lista corsi
  getCorsi(): void {
    this.corsoTable.rows = [];

    this.serviceCorso.getCorsi().subscribe((corsi) =>
      corsi.forEach((element) => {
        this.corsoTable.rows.push([
          element.id,
          element.name,
          element.professor,
        ]);
      })
    );
  }

  getIscrizioni(selectedCorso: Corso): void {
    this.iscrizioniTable.rows = [];

    this.serviceIscrizioni
      .getIscrizioni(selectedCorso.id!)
      .subscribe((iscrizioni: Student[]) =>
        iscrizioni.forEach((element) => {
          this.iscrizioniTable.rows.push([
            element.id,
            element.matricola,
            element.nome,
            element.cognome,
          ]);
        })
      );
  }

  deleteIscrizione() {
    this.serviceIscrizioni
      .deleteIscrizione(this.selectedStudent.id!, this.selectedCorso.id!)
      .subscribe(() => this.getIscrizioni(this.selectedCorso));
    this.hideCancellaIscrizione();
  }

  deleteCorso() {
    this.serviceCorso
      .deleteCorso(this.selectedCorso.id!)
      .subscribe(() => this.getCorsi());
    this.hideCancellaCorso();
  }

  //Update corso dalla form
  updateCorso(corso: string[]) {
    const corsoUpdated: Corso = {
      name: corso[0],
      professor: corso[1],
    };
    this.serviceCorso
      .updateCorso(this.selectedCorso.id!, corsoUpdated)
      .subscribe(() => this.getCorsi());

    this.showUpdateCorso = false;
  }
}
