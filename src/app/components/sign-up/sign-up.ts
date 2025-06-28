import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/errorService/error-service';
import { ToastService } from '../../services/successToast/toast-service';


@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
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
    password: new FormControl('', [ Validators.required, Validators.minLength(8)])

  })


  createNewUser() {
    if( this.signUpForm.invalid ) {
      this.signUpForm.markAllAsTouched();
      this.errorService.handleError("Hang on — a few required details are missing. You’re almost there!")
      return;
    }
    else {
      const { email, password } = this.signUpForm.value
      
      this.authService.signUp( email, password )
      .then( userCredentials => {
        console.log('User registered: ', userCredentials.user )
        this.signUpForm.reset()
        this.toastService.handleSuccess("You're all set! Let's help you take your first note.")
        this.navigateToHome()
      })
      .catch( err => {
        this.errorService.handleError("Oops! We hit a snag. Please refresh or try again shortly")
      })
    
    }

  }


  navigateToHome() {
    this.router.navigate(['view-notes'])
  }


  navigateToSignIn() {
    this.router.navigate(['sign-in'])
  }




}
