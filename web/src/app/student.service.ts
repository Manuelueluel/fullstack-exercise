import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, delay, map, of, throwError } from 'rxjs';
import { Student } from './student';
import { Environment } from './environment';
import { ApiPaths } from './api-paths';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getStudent(id: number): Observable<Student> {
    return this.http
      .get<Student>(
        `${Environment.apiUrl}/${ApiPaths.student}/${id}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //Ottiene una lista di Student che combaciano con la matricola anche parziale passata
  getSuggestions(matricola: number) {
    return this.http
      .get<Student[]>(
        `${Environment.apiUrl}/${ApiPaths.student}/getByMatricola?matricola=${matricola}`,
        this.httpOptions
      )
      .pipe(delay(500), catchError(this.handleError));
  }

  getStudents(): Observable<Student[]> {
    return this.http
      .get<Student[]>(
        `${Environment.apiUrl}/${ApiPaths.student}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  createStudent(student: Student): Observable<Student> {
    return this.http
      .post<Student>(
        `${Environment.apiUrl}/${ApiPaths.student}`,
        student,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http
      .put<Student>(
        `${Environment.apiUrl}/${ApiPaths.student}/${id}`,
        student,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http
      .delete<Student>(
        `${Environment.apiUrl}/${ApiPaths.student}/${id}`,
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
