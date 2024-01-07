import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './modal-basic.html'
})
export class NgbdModalBasic   implements OnInit {


  closeResult: string;

  isNewUser = true;
  email : string;
  password : string;
  errorMessage : string;
  error: {name: string, message: string} = {name: '', message: ''};

  resetPassword = false;

  constructor(private modalService: NgbModal, public authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/user'])
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  changeForm() {
    this.isNewUser = !this.isNewUser
  }

  onSignUp(): void {
   /* if (this.validateForm(this.email, this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/user']))
        .catch( _error =>{
          this.error = _error;
          this.router.navigate(['/']);
        })
    }*/
   console.log("je passe par la");
  }

  onLoginEmail(): void {
    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/user']))
        .catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
    }
  }

  open(content:any) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
         return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
    } else {
         return  `with: ${reason}`;
    }
  }

  validateForm(email: string, password: string): boolean {
    if(this.email.length === 0){
      this.errorMessage ='Please  enter Email';
      return false
    }
    if(this.password.length === 0){
      this.errorMessage ='Please  enter password';
      return false;
    }
    if (password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!'
      return false
    }
    this.errorMessage = ''

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
