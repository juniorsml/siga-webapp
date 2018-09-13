import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';


@Injectable()
export class FormService {

  public objTrip = new BehaviorSubject<any>({test : "Teste"});
  public currentObj:Observable<any> = this.objTrip.asObservable();

  constructor() { }

  updateObj(obj: any) {
    this.objTrip.next(obj)
  }

}