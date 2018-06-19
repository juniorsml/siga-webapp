import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public logout(): void {
    localStorage.removeItem(environment.authTokenName);
  }

  public login(email: string, password: string): Observable<any> {
    return Observable.create(observer => {
      setTimeout(() => {
        const tokenValue = 'tokenValue';
        if (email && password) {
          localStorage.setItem(environment.authTokenName, tokenValue);
          observer.next(tokenValue);
          return;
        }
        observer.error({ errorMessage: 'Usuário ou senha incorretos' });
      }, 1000);
    });
  }

  public getToken(): any {
    return localStorage.getItem(environment.authTokenName);
  }
}
