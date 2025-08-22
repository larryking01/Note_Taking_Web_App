import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authentication/auth-service';
import { ErrorService } from '../../services/errorService/error-service';
import { ToastService } from '../../services/successToast/toast-service';



@Component({
  selector: 'app-sign-in',
  imports: [ ReactiveFormsModule, CommonModule, RouterModule ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss'
})
export class SignIn {

  authService = inject( AuthService )

  router = inject( Router )

  toastService = inject( ToastService )

  errorService = inject( ErrorService )

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required ),
    password: new FormControl('', Validators.required )

  })


  signInUser() {
    if( this.signInForm.invalid ) {
      this.signInForm.markAllAsTouched();
      this.errorService.handleError("Hang on — a few required details are missing. You’re almost there!")
      return;
    }
    else {
      const { email, password } = this.signInForm.value
      
      this.authService.signIn( email, password )
      .then( userCredentials => {
        this.signInForm.reset()
        this.toastService.handleSuccess(`Welcome back, ${ userCredentials.user.email }`)
        this.navigateToHome()
      })
      .catch( error => {
        // console.log(error.code)
        if (error.code === 'auth/invalid-email') {
          this.errorService.handleError('Please enter a valid email address.')
        } 
        else if (error.code === 'auth/user-disabled') {
          this.errorService.handleError('This account has been disabled. Contact support if you think this is a mistake.')
        } 
        else if (error.code === 'auth/user-not-found') {
          this.errorService.handleError('No account found with this email. Please sign up first.');
        } 
        else if(error.code === 'auth/wrong-password') {
          this.errorService.handleError('Incorrect password. Please try again or reset your password');
        }
        else if(error.code === 'auth/too-many-requests') {
          this.errorService.handleError('Too many failed attempts. Please wait a moment and try again.”');
        }
        else if(error.code === 'auth/network-request-failed') {
          this.errorService.handleError('Network error. Check your internet connection and try again');
        }
        else if(error.code === 'auth/invalid-credential') {
          this.errorService.handleError('The account does not exist, or your email or password is incorrect. Please check and try again.');
        }
        else if(error.code === 'auth/operation-not-allowed') {
          this.errorService.handleError('Sign-in with email and password is currently disabled');
        }
        else {
          this.errorService.handleError('Something went wrong. Please try again.');
        }
      })
    
    }

  }



  navigateToHome() {
    this.router.navigate(['view-notes'])
  }

}
