import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { Trip } from '../models/api/Trip';



@Injectable()
export class TripObject {

  public objTrip = new BehaviorSubject<Trip>(<Trip>{});
  public currentObj:Observable<any> = this.objTrip.asObservable();

  constructor() { }

  updateObj(obj,key) { 
    
    const valueCurrent = this.objTrip.getValue();
    
    valueCurrent[key] = obj;
    this.objTrip.next(valueCurrent)
  
  }
}