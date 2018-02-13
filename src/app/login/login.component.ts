import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sga-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public isLoggingIn: boolean;
  public errorText: string = '';
  public error: boolean;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  public login(form: any) {
    this.isLoggingIn = true;
    const { email, password } = form.value;
    this.authService
      .login(email, password)
      .subscribe(
        token => this.onSuccessLogin(token),
        error => this.onErrorLogin(error)
      );
  }

  private onSuccessLogin(token: string): void {
    console.log(token);
    this.router.navigateByUrl('/motorist');
  }

  private onErrorLogin(data: any): void {
    this.errorText = data.errorMessage;
    this.isLoggingIn = false;
    this.error = true;
  }
}
