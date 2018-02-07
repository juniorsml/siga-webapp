import { Router } from "@angular/router";
import { RequestOptions } from "@angular/http";
import { XHRBackend } from "@angular/http";
import { HttpService } from "../services/http.service";

export function httpFactory(
  backend: XHRBackend,
  defaultOptions: RequestOptions,
  router: Router
) {
  return new HttpService(
    backend,
    defaultOptions,
    router
  );
}
