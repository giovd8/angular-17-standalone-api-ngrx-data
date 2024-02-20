import {Injectable} from '@angular/core';
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {User} from "../../../core/models/user";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Update} from "@ngrx/entity";
import {HttpOptions} from "@ngrx/data/src/dataservices/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DefaultDataService<User> {

  // questo servizio serve per dire a ngrx come aspettarsi il dato. da una get all (definita sul resolver)
  // ngrx si aspetta direttamente un array di utenti e non sa che è contenuto in un oggetto con una chiave data e la chiamata per lui dovrebbe essere api/courses

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('User', http, httpUrlGenerator);
  }

  override getAll(): Observable<User[]> {
    // è stata wrappata la risposta in un oggetto con una chiave payload solo per esempio di chiamata custom.
    // Nel caso in cui l'oggetto contenga direttamente l'array della risposta non è neccessario ovveraidare la chiamate
    return this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
        map((res: User[]) => ({data: res})),
        map((res: { data: User[] }) => res.data)
      )
  }

  override update(update: Update<User>, options?: HttpOptions): Observable<User> {
    return this.http
      .put<User>(`https://jsonplaceholder.typicode.com/users/${update.id}`, update.changes)
  }

  override add(entity: User, options?: HttpOptions): Observable<User> {
    return this.http
      .post<User>(`https://jsonplaceholder.typicode.com/users`, entity)
  }

  override delete = (key: number | string, options?: HttpOptions): Observable<string | number> => this.http
    .delete<string | number>(`https://jsonplaceholder.typicode.com/users/${key}`);

  override getById(id: any): Observable<User> {
    return this.http
      .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
  }

  override getWithQuery(queryParams: any, options?: HttpOptions): Observable<User[]> {
    console.log('queryParams', queryParams);
    return this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users', {
        params: queryParams
      }).pipe(
        map((res: User[]) => ({data: res})),
        map((res: { data: User[] }) => res.data)
      )
  }
}
