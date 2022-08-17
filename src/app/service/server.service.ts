import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Status } from '../enum/status.enum';
import { CustomResponse } from '../interface/custom-response';
import { Server } from '../interface/server';

@Injectable({providedIn: 'root'})
export class ServerService {
  private readonly apiUrl = 'http://localhost:8080'; //backend URL
  
  constructor(private http: HttpClient) { }

  //define a method to retrieve all of the servers

  // getServers(): Observable<CustomResponse> {
  //   return this.http.get<CustomResponse>('http://localhost:8080/server/list');
  // }


  servers$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );


  save$ = (server: Server) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/server/save` ,server)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  ping$ = (ipAddress: string) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  filter$ = (status: Status, response: CustomResponse) => 
  <Observable<CustomResponse>> new Observable<CustomResponse>(
      suscriber => {
      console.log(response);
      suscriber.next(
        status === Status.ALL ? { ...response, message: `Servers filtered by ${status} status` } : 
        {
          ...response, 
          message: response.data.servers.
          filter(server => server.status === status).length > 0 ? `Servers filtered by ${status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'} status` : `No servers of ${status} found`,data: { servers : response.data.servers
            .filter(server => server.status === status)}
        }
      )
      suscriber.complete();
    }
  )
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  delete$ = (serverId: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );


  // Error processing method
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error)
    return throwError(() => new Error(`An error occured - Error code: ${error.status}`));
  }
}



// HttpCLient can be used to make Http call backend to retrieve data  and then map it to the app-state.ts
// Class with all the functions to make HTTP Requests
// First import { HttpClientModule } from '@angular/common/http'; in app.module.ts
//servers$ '$' at the end denotes an Observable
  