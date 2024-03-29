import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  isNewUser = true;
  email = '';
  password = '';
  errorMessageMail = '';
  errorMessagePassword ='';
  errorMessageLength ='';
  error: { name: string, message: string } = { name: '', message: '' };

  resetPassword = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {}

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/user'])
    }
  }

  clearErrorMessage() {
    this.errorMessageMail = '';
    this.errorMessagePassword ='';
    this.errorMessageLength ='';
    this.error = { name: '', message: '' };
  }
  changeForm() {
    this.isNewUser = !this.isNewUser
  }

  onSignUp(): void {
    this.clearErrorMessage()
    if (this.validateForm(this.email, this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigate(['/user'])
        }).catch(_error => {
        this.error = _error
        this.router.navigate(['/'])
      })
    }
  }

  onLoginEmail(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/Accueil']))
        .catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessageMail = 'Please enter Email!'
      return false
    }

    if (password.length === 0) {
      this.errorMessagePassword = 'Please enter Password!'
      return false
    }

    if (password.length < 6) {
      this.errorMessageLength = 'Password should be at least 6 characters!'
      return false
    }

    this.errorMessageMail = '';
    this.errorMessagePassword = '';
    this.errorMessageLength = ''
    return true
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
      return false;
    }

    return true;
  }
  sendResetEmail() {
    this.clearErrorMessage()
    this.authService.resetPassword(this.email)
      .then(() => this.resetPassword = true)
      .catch(_error => {
        this.error = _error
      })
  }

}
