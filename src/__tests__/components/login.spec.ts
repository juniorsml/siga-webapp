import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../../app/login/login.component'

describe('LoginComponent', () => {
  let component: LoginComponent;
  let dom: any;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [ LoginComponent ]
      });
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;

      dom = fixture.nativeElement;
  }));

  test('should exist', () => {
      expect(component).toBeDefined();
  });
});
