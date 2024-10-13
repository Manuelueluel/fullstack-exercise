import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Corso } from './corso';
import { Environment } from './environment';
import { ApiPaths } from './api-paths';

@Injectable({
  providedIn: 'root',
})
export class CorsoService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /*  https://angular.io/api/common/http/HttpClient#get 
    "Constructs an observable that, when subscribed, causes the configured GET request 
    to execute on the server. See the individual overloads for details on the return type."
    È necessaria la subscribe?
  */

  getCorso(id: number): Observable<Corso> {
    return this.http
      .get<Corso>(
        `${Environment.apiUrl}/${ApiPaths.corso}/${id}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getCorsi(): Observable<Corso[]> {
    return this.http
      .get<Corso[]>(`${Environment.apiUrl}/${ApiPaths.corso}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  createCorso(corso: Corso): Observable<Corso> {
    return this.http
      .post<Corso>(
        `${Environment.apiUrl}/${ApiPaths.corso}`,
        corso,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateCorso(id: number, corso: Corso): Observable<Corso> {
    return this.http
      .put<Corso>(
        `${Environment.apiUrl}/${ApiPaths.corso}/${id}`,
        corso,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteCorso(id: number): Observable<Corso> {
    return this.http
      .delete<Corso>(
        `${Environment.apiUrl}/${ApiPaths.corso}/${id}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //vedi per gestione errori https://angular.io/guide/http-handle-request-errors

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
