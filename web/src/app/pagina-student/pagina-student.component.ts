import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { StudentActions } from '../store/student.actions';
import { selectStudent } from '../store/student.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-pagina-student',
  templateUrl: './pagina-student.component.html',
  styleUrls: ['./pagina-student.component.css'],
})
export class PaginaStudentComponent implements OnInit {
  titleAggiungiStudente: string;
  titleStudentTable: string;
  titleIscrizioneStudente: string;
  titleModificaStudent!: string;
  titleCancellaStudent!: string;
  studentTable: any;
  showModificaStudent: boolean;
  showCancellaStudent: boolean;
  active: number = 1;

  selectedStudent: Student = {
    id: -1,
    matricola: -1,
    nome: '',
    cognome: '',
  };

  studentSelezionato$ = this.store
    .select(selectStudent)
    .subscribe((student: Student) => {
      this.titleModificaStudent = $localize`Modify student ${student.matricola}`;
      this.titleCancellaStudent = $localize`Delete student ${student.matricola}`;
    });

  constructor(private serviceStudent: StudentService, private store: Store) {
    this.studentTable = {
      headers: [
        $localize`Id`,
        $localize`Badge number`,
        $localize`Name`,
        $localize`Surname`,
      ],
      rows: [],
    };

    this.titleStudentTable = $localize`Students list`;
    this.titleAggiungiStudente = $localize`Add student`;
    this.titleIscrizioneStudente = $localize`Enroll student in a course`;

    this.showModificaStudent = false;
    this.showCancellaStudent = false;
  }

  ngOnInit(): void {
    this.getStudents();
  }

  //Creo un nuovo studente
  createStudentEvent(student: string[]): void {
    const newStudent = {
      matricola: +student[0],
      nome: student[1],
      cognome: student[2],
    };

    this.serviceStudent
      .createStudent(newStudent)
      .subscribe(() => this.getStudents());
  }

  //Seleziono uno studente dalla lista
  selectStudentEvent(student: string[]): void {
    //Mostro i componenti di modifica e canellazione di uno studente
    this.showModificaStudent = true;
    this.showCancellaStudent = true;
    //Selezionando uno student prendo il suo id, mi servirà per l'updateStudent
    this.selectedStudent.id = +student[0];
    this.selectedStudent.matricola = +student[1];
    this.selectedStudent.nome = student[2];
    this.selectedStudent.cognome = student[3];

    this.store.dispatch(
      StudentActions.selectStudent({ student: this.selectedStudent })
    );
  }

  //Update studente dalla form
  updateStudentEvent(student: string[]): void {
    //Modifico student dai dati del form passati tramite student, eccetto l'id
    const studentUpdated = {
      matricola: +student[0],
      nome: student[1],
      cognome: student[2],
    };

    this.serviceStudent
      .updateStudent(this.selectedStudent.id!, studentUpdated)
      .subscribe(() => this.getStudents());

    this.showModificaStudent = false;
  }

  deleteStudent() {
    this.serviceStudent
      .deleteStudent(this.selectedStudent.id!)
      .subscribe(() => this.getStudents());
    this.hideCancellaStudent();
    this.hideModificaStudent();
  }

  //Nasconde component cancella student
  hideCancellaStudent() {
    this.showCancellaStudent = false;
  }

  //Nasconde component modifica student
  hideModificaStudent() {
    this.showModificaStudent = false;
  }

  //fetch lista studenti
  getStudents(): void {
    this.studentTable.rows = [];

    this.serviceStudent.getStudents().subscribe((students) =>
      students.forEach((element) => {
        this.studentTable.rows.push([
          element.id,
          element.matricola,
          element.nome,
          element.cognome,
        ]);
      })
    );
  }
}
