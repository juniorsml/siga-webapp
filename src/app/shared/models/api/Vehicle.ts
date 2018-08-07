import { Subscriber } from './Subscriber';

export class Vehicle {
  id: string;
  numberPlate: string;
  type: string;
  make: string;
  model: string;
  registration?: any;
  year: number;
  color?: any;
  address?: any;
  created: number;
  creator: string;
  updater?: any;
  updated?: any;
  subscribers: Array<Subscriber>;
  trips?: any;
  country: string;
  trailers?: any;
}
