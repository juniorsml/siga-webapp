import { Subscriber } from './Subscriber';

export class Truck {
  id: string;
  anttDueDate: Date;
  anttNumber: string;
  comunication: string;
  fleetNumber: number;
  // --  informacoes da carreta --
  tipo: string;
  colour: string;
  capacity: number;
  make: string;
  model: string;
  number: number;
  numberPlate: string;
  radius: number;
  renavan: number;
  tech: string;
  vehicleType: string;
  year: number;
  // Informacoes do motorista --

  ownerDocument: number;
  ownerName:  string;
  ownerDocumentType:  string;
  ownerDocumentId: number;
  ownerPhone: string;
  ownerCellPhone:  string;
  location: any;
  subscribers: Array<Subscriber>;
}
