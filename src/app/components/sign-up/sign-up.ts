import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ErrorService } from '../../services/errorService/error-service';
import { ToastService } from '../../services/successToast/toast-service';


@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp {

  authService = inject( AuthService )

  router = inject( Router )

  errorService = inject( ErrorService )

  toastService = inject( ToastService )

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required ),
    password: new FormControl('', Validators.required)

  })


  createNewUser() {
    if( this.signUpForm.invalid ) {
      this.signUpForm.markAllAsTouched();
      this.errorService.handleError("All fields are required. Please enter both your email and password.")
      return;
    }
    else {
      const { email, password } = this.signUpForm.value
      
      this.authService.signUp( email, password )
      .then( userCredentials => {
        this.signUpForm.reset()
        this.toastService.handleSuccess("You're all set! Let's help you take your first note.")
        this.navigateToHome()
      })
      .catch( error => {
        // console.log(error.code)
        if (error.code === 'auth/email-already-in-use') {
          this.errorService.handleError('This email is already registered. Please try signing in instead.')
        } 
        else if (error.code === 'auth/invalid-email') {
          this.errorService.handleError('Please enter a valid email address.')
        } 
        else if (error.code === 'auth/weak-password') {
          this.errorService.handleError('Password must be at least 6 characters long.');
        } 
        else if(error.code === 'auth/network-request-failed') {
          this.errorService.handleError('Network error. Please check your internet connection and try again.');
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
