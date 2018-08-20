import { Subscriber } from './Subscriber';

export class Device {
  tipo:any;
  id: string;
  maek?: any;
  tech?: any;
  model?: any;
  nickname?: any;
  subscribers: Array<Subscriber>;
}
