import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpService) {}

  public logout(): void {
    localStorage.removeItem(environment.authTokenName);
  }

  public login(username: string, password: string): Observable<any> {
    return this
      .http
      .post(`api/users/web/login`, {username, password});
    // return Observable.create(observer => {
    //   setTimeout(() => {
    //     const tokenValue = 'tokenValue';
    //     if (email && password) {
    //       localStorage.setItem(environment.authTokenName, tokenValue);
    //       observer.next(tokenValue);
    //       return;
    //     }
    //     observer.error({ errorMessage: 'Usuário ou senha incorretos' });
    //   }, 1000);
    // });
  }

  public getToken(): any {
    return localStorage.getItem(environment.authTokenName);
  }
}
