import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../../app/login/login.component';
import { AuthService } from '../../app/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [LoginComponent],
        providers: [
          { provide: AuthService, useValue: new AuthService() }, 
          { provide: Router }]
      });
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
    })
  );

  test('should exist default', () => {
    expect(component).toBeDefined();
    expect(component.error).toBeUndefined();
    expect(component.errorText).toEqual('');
    expect(component.isLoggingIn).toBeUndefined();
  });

  test('should login', () => {
    const form = {
      value: {
        email: 'dev@condusit.com',
        password: '12345'
      }
    };
    
    expect(component.login(form));
  });
});
