import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';


@Injectable()
export class FormService {

  public objTrip = new BehaviorSubject<any>({
      generalInfos : {
      keyDocument: "chave",
      documentValue: "Valor do Documento",
      configId: "5b972fb00000000000004352",
      kindOfProduct: "Mercadoria/Produto",
      totalAmoutn: "Valor do Embarque R$",
      totalWeight: "Peso total da carga"
    },
    motorist : { id: '232Adas0000000000000'}
  
  });
  public currentObj:Observable<any> = this.objTrip.asObservable();

  constructor() { }

  updateObj(obj,key) {
    
    const valueCurrent = this.objTrip.getValue();
    valueCurrent[key] = obj;
    }
}