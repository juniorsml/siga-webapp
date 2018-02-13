import { Component } from '@angular/core';

@Component({
  selector: 'sga-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {
  user: any;
  error = false;
  errorText: string;
  isLoggingIn: boolean;

  login(email, password) {
    console.log(email);
    console.log(password);
  }
}
