import { User } from 'src/Models/user.model';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map,catchError}  from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


  signUp(newUser: User) {
    const body = JSON.stringify(newUser);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
     })
    };
  return this.http.post('http://localhost:3000/api/user/signUp', body, httpOptions)
  .pipe(catchError(this.handleError));
}

signIn(sUser: User) {
  const body = JSON.stringify(sUser);
  //   const httpheader = new HttpHeaders({'Content-Type': 'application/json'});
  const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json'
     })
   };
  return this.http.post('http://localhost:3000/api/user/signIn', body, httpOptions)
  .pipe(catchError(this.handleError));
}

}
