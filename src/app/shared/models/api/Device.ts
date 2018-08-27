import { Subscriber } from './Subscriber';

export interface Device {
  type: any;
  idTerminal: string;
  technology?: any;
  comunication: any;
  model?: any;
  name?: any;
  subscribers: Array<Subscriber>;
}
