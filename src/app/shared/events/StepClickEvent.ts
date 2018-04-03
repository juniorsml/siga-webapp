export class StepClickEvent {
  event: Event;
  data: any;

  constructor(event: Event, data: any) {
    this.event = event;
    this.data = data;
  }
}
