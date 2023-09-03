import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { NewUserDto } from '../models/new-user-dto.model';
import { LoginDto } from '../models/login-dto.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;

  emailAlreadyExist: boolean = false;
  loginDataIncorrect: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]{1,}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]{1,}$')]],
      signupEmail: ['', [Validators.required, Validators.email]],
      signupPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  switchToSignup(): void {
    this.loginForm.reset();
  }

  switchToLogin(): void {
    this.signupForm.reset();
    this.emailAlreadyExist = false;
  }

  showLoginPassword: boolean = false;
  showSignupPassword: boolean = false;

  toggleLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  toggleSignupPassword(): void {
    this.showSignupPassword = !this.showSignupPassword;
  }

  checkEmail(): void {
    const signupEmail: string = this.signupForm.controls['signupEmail'].value;
    this.authService.checkEmailExists(signupEmail).subscribe(result => {
      if (result) {
        this.emailAlreadyExist = true;
        this.signupForm.controls['signupEmail'].setErrors({'incorrect': true});
      } else {
        this.emailAlreadyExist = false;
      }
    });
  }

  onSubmitSignup(): void {
    const newUserDto: NewUserDto = new NewUserDto(this.signupForm.controls['firstName'].value,
                                                  this.signupForm.controls['lastName'].value,
                                                  this.signupForm.controls['signupEmail'].value,
                                                  this.signupForm.controls['signupPassword'].value);
    this.authService.postUser(newUserDto).subscribe({
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  onSubmitLogin(): void {
    const email: string = this.loginForm.controls['loginEmail'].value;
    const password: string = this.loginForm.controls['loginPassword'].value;
    const loginDto: LoginDto = new LoginDto(email, password);
    this.authService.tryToLogin(loginDto).subscribe({
      next: (response) => {
        if (response.userId) {
          console.log("Success");
        } else {
          console.log("Login failed");
        }
      },
      error: (error) => {
        console.error('Error', error);
      }
    });  
  }
}
