import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import {GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  login(email:string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email,password).then( res => {

      localStorage.setItem('token', 'true')
      console.log(res)
      if(res.user?.emailVerified == true) {
        this.router.navigate(['/dashboard'])
      } else {
        this.router.navigate(['/verify'])
      }


    }, err => {
      alert(err.message)
      this.router.navigate(['/login'])
    })
  }

  // register

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email,password).then( res => {
      alert('Registration Successful')
      this.sendEmailForVerification(res.user)
    }, err => {
      alert(err.message)
      this.router.navigate(['/register'])
    })
  }

  // logout

  logout() {
    this.fireAuth.signOut().then( res => {
      localStorage.removeItem('token');
      this.router.navigate(['/login'])

    }, err => {
      alert(err.message)
      this.router.navigate(['/login'])
    })
  }

  // forgot password

  forgotPassword(email:string) {
    this.fireAuth.sendPasswordResetEmail(email).then( () => {
      this.router.navigate(['/verify'])
    }, err => {
      alert('Something went wrong')
    }
    )
  }

  // email verification

  sendEmailForVerification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/verify']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  // sign in with google

  googleSignIn() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then( res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid))

    }, err => {
      alert(err.message)
    })
  }



}
