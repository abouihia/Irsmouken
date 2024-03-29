import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
      this.afAuth.authState.subscribe((auth) =>{
      this.authState =auth;
    });
  }

   get isUserAnonymousLoggedIn(): boolean{
     return this.authState !== null ? this.authState.isAnonymous : false;
   }

   get currentUserId(): string{
     return  this.authState !==null ? this.authState.uid  : '';
   }

   get currentUserName():string{
     return  this.authState['email'];
   }

   get currentUser() :any{
     return  this.authState !== null  ? this.authState : null;
   }


  get isUserEmailLoggedIn(): boolean {
    return  (this.authState !== null) && (!this.isUserAnonymousLoggedIn) ;
  }

  signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {this.authState = user })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }

  resetPassword( email:string){
     return this.afAuth.auth.sendPasswordResetEmail(email);
  }

}


