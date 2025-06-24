import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp {

  authService = inject( AuthService )

  router = inject( Router )

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required ),
    password: new FormControl('', [ Validators.required, Validators.minLength(8)])

  })


  createNewUser() {
    if( this.signUpForm.invalid ) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    else {
      const { email, password } = this.signUpForm.value
      
      this.authService.signUp( email, password )
      .then( userCredentials => {
        console.log('User registered: ', userCredentials.user )
        this.signUpForm.reset()
        alert("Account created successfully");
        this.navigateToHome()
      })
      .catch( err => {
        console.error( 'failed to register user ', err)
      })
    
    }

  }


  navigateToHome() {
    this.router.navigate(['/'])
  }




}
