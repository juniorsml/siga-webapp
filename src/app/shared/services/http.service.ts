import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Headers
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import 'rxjs/Rx';

@Injectable()
export class HttpService extends Http {
  constructor(
    backend: ConnectionBackend,
    private defaultOptions: RequestOptions,
    private router: Router
  ) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs, externalRequest?: boolean): Observable<any> {
    this.beforeRequest();
    const  fullUrl = externalRequest ? url : this.getFullUrl(url);
    debugger;
    return super
      .get(fullUrl , this.requestOptions(options))
      .catch(this.onCatch)
      .do(this.onSuccess, this.onError)
      .finally(() => this.onFinally());
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super
      .patch(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do(this.onSuccess, this.onError)
      .finally(() => this.onFinally());
  }

   post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super
      .post(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do(this.onSuccess, this.onError)
      .finally(() => this.onFinally());
  }

  postFile(url: string, body: FormData, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    debugger;
    options = this.defaultOptions.merge(options);
    const userAuthToken = this.getToken();

    if (userAuthToken.token) {
      options.headers.append(userAuthToken.key, userAuthToken.token);
    }
    return super
      .post(this.getFullUrl(url), body, options)
      .catch(this.onCatch)
      .do(this.onSuccess, this.onError)
      .finally(() => this.onFinally());
  }

  put(url: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super
      .put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do(this.onSuccess, this.onError)
      .finally(() => this.onFinally());
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super
      .delete(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do(this.onSuccess, this.onError)
      .finally(() => this.onFinally());
  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = this.defaultOptions.merge(options);

    if (options.headers == null) {
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
    }

    const userAuthToken = this.getToken();

    if (userAuthToken.token) {
      options.headers.append(userAuthToken.key, userAuthToken.token);
    }
    return options;
  }

  private getToken() {
    const token = localStorage.getItem(environment.authTokenName);
    const userAuthToken  = {'key': 'x-auth-token', token};
    return userAuthToken ;
  }

  private getFullUrl(url: string): string {
    return environment.api + url;
  }

  private beforeRequest() {
  }

  private onCatch(error: any): Observable<any> {
    let response: ApiResponse = {
      errorMessage: 'Ocorreu um erro inesperado',
      isSuccess: false,
      result: null
    };

    try {
      response = <ApiResponse>error.json();
    } catch (error) { }

    return Observable.throw(response);
  }

  private onSuccess() { }

  private onError(error: any) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
  }

  private onFinally() {
  }
}
