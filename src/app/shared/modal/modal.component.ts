import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations'


@Component({
  selector: 'sga-modal',
  templateUrl: './modal.component.html',
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class ModalComponent {
  visiblityState = 'hidden'
  toggle() {
    if (this.visiblityState === 'hidden')
      this.visiblityState = 'shown'
    else
      this.visiblityState = 'hidden'
  }
}
