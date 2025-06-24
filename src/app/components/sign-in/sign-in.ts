import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth-service';


@Component({
  selector: 'app-sign-in',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss'
})
export class SignIn {

  authService = inject( AuthService )

  router = inject( Router )

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required ),
    password: new FormControl('', [ Validators.required, Validators.minLength(8)])

  })


  signInUser() {
    if( this.signInForm.invalid ) {
      this.signInForm.markAllAsTouched();
      return;
    }
    else {
      const { email, password } = this.signInForm.value
      
      this.authService.signIn( email, password )
      .then( userCredentials => {
        console.log('User logged in: ', userCredentials.user )
        this.signInForm.reset()
        alert("Logged in successfully");
        this.navigateToHome()
      })
      .catch( err => {
        console.error( 'failed to log in user ', err)
      })
    
    }

  }



  navigateToHome() {
    this.router.navigate(['/'])
  }


}
