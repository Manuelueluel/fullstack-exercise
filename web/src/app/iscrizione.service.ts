import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { StudentCorso } from './studentcorso';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Student } from './student';
import { Environment } from './environment';
import { ApiPaths } from './api-paths';

@Injectable({
  providedIn: 'root',
})
export class IscrizioneService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  iscriviStudente(studentCorso: StudentCorso): Observable<StudentCorso> {
    return this.http
      .post<StudentCorso>(
        `${Environment.apiUrl}/${ApiPaths.iscrizioni}`,
        studentCorso,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getIscrizioni(id: number): Observable<Student[]> {
    return this.http
      .get<Student[]>(
        `${Environment.apiUrl}/${ApiPaths.iscrizioni}/${id}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteIscrizione(student_id: number, corso_id: number): Observable<any> {
    return this.http
      .delete(
        `${Environment.apiUrl}/${ApiPaths.iscrizioni}/${student_id}/${corso_id}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status >= 400 && error.status < 500) {
      // A client-side or network error occurred. Handle it accordingly.
      alert(`An error occurred: ${error.error}`);
    }
    if (error.status >= 500 || error.status < 400) {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      //Con codice < 300, qualcosa è andato storto nel codice
    }

    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
