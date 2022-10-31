import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  login(email:string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email,password).then( res => {
      localStorage.setItem('token', 'true')

      if(res.user?.emailVerified == true) {
        this.router.navigate(['dashboard'])
      } else {
        this.router.navigate(['/verify-email'])
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
      this.router.navigate(['/login'])
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

  sendEmailForVerification(user: any) {
    user.sendEmailVarification().then( (res:any) => {
      this.router.navigate(['/verify-email'])
    }, (err: any) => {
      alert('Something went wrong. Not able to send email')
    })
  }



}
