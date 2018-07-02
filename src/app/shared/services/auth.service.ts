import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { User } from '../models/api/User';
import { map } from 'rxjs/operators';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpService) {}

  public logout(): void {
    localStorage.removeItem(environment.authTokenName);
  }

  public login(username: string, password: string): Observable<User> {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers: headers});
    return this
      .http
      .post(`api/users/web/login`, {username, password}, options)
      .pipe(map(res => <User>res.json()));
  }

  public getToken(): any {
    return localStorage.getItem(environment.authTokenName);
  }
}
