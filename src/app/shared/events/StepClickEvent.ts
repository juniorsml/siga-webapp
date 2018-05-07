export class StepClickEvent {
  index: number;
  event: Event;
  data: any;

  constructor(event: Event, data: any, index: number) {
    this.index = index;
    this.event = event;
    this.data = data;
  }
}
