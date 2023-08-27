import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]{1,}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]{1,}$')]],
      signupEmail: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9\.]+@[a-z]+\.[a-z]{2,3}$')]],
      signupPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9\.]+@[a-z]+\.[a-z]{2,3}$')]],
      loginPassword: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9!@#$%]{8,20}$')]],
    });
  }

  switchToSignup(): void {
    this.loginForm.reset();
  }

  switchToLogin(): void {
    this.signupForm.reset();
  }

  showLoginPassword: boolean = false;
  showSignupPassword: boolean = false;

  toggleLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  toggleSignupPassword(): void {
    this.showSignupPassword = !this.showSignupPassword;
  }
}
