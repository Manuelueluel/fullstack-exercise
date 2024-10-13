import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormStudentComponent } from './form-student/form-student.component';
import { FormCorsoComponent } from './form-corso/form-corso.component';
import { HttpClientModule } from '@angular/common/http';
import { TabellaComponent } from './tabella/tabella.component';
import { PaginaStudentComponent } from './pagina-student/pagina-student.component';
import { PaginaCorsoComponent } from './pagina-corso/pagina-corso.component';
import { IscrizioneStudentComponent } from './iscrizione-student/iscrizione-student.component';
import { AcceptDenyComponent } from './accept-deny/accept-deny.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NameValidatorDirective } from './custom-validators/name-validator.directive';
import { MatricolaValidatorDirective } from './custom-validators/matricola-validator.directive';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { corsoReducer } from './store/corso.reducer';
import { studentReducer } from './store/student.reducer';
import { studentsReducer } from './store/students.reducer';
import { CustomInputComponent } from './custom-input/custom-input.component';

@NgModule({
  declarations: [
    AppComponent,
    FormStudentComponent,
    FormCorsoComponent,
    TabellaComponent,
    PaginaStudentComponent,
    PaginaCorsoComponent,
    IscrizioneStudentComponent,
    AcceptDenyComponent,
    NameValidatorDirective,
    MatricolaValidatorDirective,
    NavbarComponent,
    CustomInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot({
      corso: corsoReducer,
      student: studentReducer,
      students: studentsReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
