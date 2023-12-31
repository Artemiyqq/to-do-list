import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NewUserDto } from '../models/new-user-dto.model';
import { LoginDto } from '../models/login-dto.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;

  isCheckboxChecked: boolean = false;

  emailAlreadyExist: boolean = false;
  loginDataIncorrect: boolean = false;
  registeredSuccessfully: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService) {
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
    this.loginDataIncorrect = false;
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
      complete: () => this.successfulRegistration()
    });
  }

  successfulRegistration(): void {
    this.switchToLogin();
    this.isCheckboxChecked = !this.isCheckboxChecked;
    this.registeredSuccessfully = true;
  }

  onSubmitLogin(): void {
    const email: string = this.loginForm.controls['loginEmail'].value;
    const password: string = this.loginForm.controls['loginPassword'].value;
    const loginDto: LoginDto = new LoginDto(email, password);
    this.authService.tryToLogin(loginDto).subscribe({
      next: (response) => {
        if (response.message !== "Invalid credentials") {
          this.userService.setUserId(response.userId);
          this.authService.loginSuccess();
        } else {
          console.log("An error occurred tests:", response);
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.loginDataIncorrect = true;
        }
        else {
          console.error('An error occurred:', error);
        }
      }
    });  
  }  
}
