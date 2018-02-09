import { Component } from '@angular/core';

@Component({
  selector: 'sga-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'sga';
}
