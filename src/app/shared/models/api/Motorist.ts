import { Subscriber } from './Subscriber';

export class Motorist {
  id: string;
  username?: any;
  accountName?: any;
  accountId?: any;
  firstName: string;
  lastName: string;
  documentType: string;
  documentId: string;
  country: string;
  email: string;
  dateOfBirth: string;
  address: string;
  cellPhone: string;
  trips?: any;
  distance?: any;
  rating?: any;
  ranking?: any;
  currentTrips?: any;
  device?: any;
  location?: any;
  subscribers: Array<Subscriber>;
  enabled: boolean;
  creatorId: string;
  created: number;
}
