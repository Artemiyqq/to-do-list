import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { RouterTestingModule } from '@angular/router/testing'


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent,AuthComponent],
      imports: [ReactiveFormsModule, RouterTestingModule ,MatTooltipModule, RouterModule.forRoot([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create signupForm with required controls', () => {
    const form = component.signupForm;
    expect(form.contains('firstName')).toBe(true);
    expect(form.contains('lastName')).toBe(true);
    expect(form.contains('signupEmail')).toBe(true);
    expect(form.contains('signupPassword')).toBe(true);
  });

  it('should mark signupForm as invalid when empty', () => {
    const form = component.signupForm;
    expect(form.valid).toBeFalsy();
  });

  it('should create loginForm with required controls', () => {
    const form = component.loginForm;
    expect(form.contains('loginEmail')).toBe(true);
    expect(form.contains('loginPassword')).toBe(true);
  });

  it('should mark loginForm as invalid when empty', () => {
    const form = component.loginForm;
    expect(form.valid).toBeFalsy();
  });

  it('should toggle showLoginPassword when toggleLoginPassword is called', () => {
    const initialValue = component.showLoginPassword;
    component.toggleLoginPassword();
    expect(component.showLoginPassword).toEqual(!initialValue);
  });

  it('should toggle showSignupPassword when toggleSignupPassword is called', () => {
    const initialValue = component.showSignupPassword;
    component.toggleSignupPassword();
    expect(component.showSignupPassword).toEqual(!initialValue);
  });

  it('should reset loginForm when switchToSignup is called', () => {
    component.loginForm.setValue({
      loginEmail: 'test@example.com',
      loginPassword: 'test123456'
    });
    component.switchToSignup();
    expect(component.loginForm.value).toEqual({
      loginEmail: null,
      loginPassword: null
    });
  });

  it('should reset signupForm when switchToLogin is called', () => {
    component.signupForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      signupEmail: 'john@example.com',
      signupPassword: 'password123'
    });
    component.switchToLogin();
    expect(component.signupForm.value).toEqual({
      firstName: null,
      lastName: null,
      signupEmail: null,
      signupPassword: null
    });
  });
})
