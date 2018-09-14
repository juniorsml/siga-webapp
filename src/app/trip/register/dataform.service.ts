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
        itinerary: {
          name:"Nome do Itinerario",
          timeStart: "Start",
          timeEnd: "End"
        },
        motorists : [
          { 
            id: '232Adas0000000000000',
            firstName: "Valter",
            documentId:"24362346236"
          },
          { 
            id: '232Adas0000000000000',
            firstName: "David",
            documentId:"532623663462"
          }
        ],
        vehicles : [
          { 
            id: "232Adas0000000000000",
            type: "Caminhao",
            vehiclePlate:"GRE-3253"
          },
          { 
            id: '232Adas0000000000000',
            type: "Carreta",
            vehiclePlate:"RTT-2343"
          }
        ],
        trailers : [
          { 
            id: "232Adas0000000000000",
            type: "Caminhao",
            vehiclePlate:"GRE-3253"
          },
          { 
            id: '232Adas0000000000000',
            type: "Carreta",
            vehiclePlate:"RTT-2343"
          }
        ]     
  });
  public currentObj:Observable<any> = this.objTrip.asObservable();

  constructor() { }

  updateObj(obj,key) {
    
    const valueCurrent = this.objTrip.getValue();
    valueCurrent[key] = obj;
    }
}