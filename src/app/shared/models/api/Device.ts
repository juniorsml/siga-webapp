import { Subscriber } from './Subscriber';

export class Device {
  id: string;
  name?: any;
  model?: any;
  technology?: any;
  updated: string;
  location: string;
  speed: string;
  batterylevel: string;
  subscribers: Array<Subscriber>;
}
