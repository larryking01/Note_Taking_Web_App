import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth-service';
import { ErrorService } from '../../services/errorService/error-service';
import { ToastService } from '../../services/successToast/toast-service';



@Component({
  selector: 'app-sign-in',
  imports: [ ReactiveFormsModule, CommonModule ],
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
    password: new FormControl('', [ Validators.required, Validators.minLength(8)])

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
        console.log('User logged in: ', userCredentials.user )
        this.signInForm.reset()
        this.toastService.handleSuccess(`Welcome back, ${ userCredentials.user.email }`)
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


  navigateToSignUp() {
    this.router.navigate(['sign-up'])
  }


}
