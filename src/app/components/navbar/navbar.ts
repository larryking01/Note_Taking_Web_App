import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/authentication/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  // encapsulation: ViewEncapsulation.None
})
export class Navbar {
  @Input() pageTitle: string = ''

  isLoggedIn: boolean = false

  currentUserEmail: string | null | undefined = null;


  // authService = inject( AuthService )

  constructor( private authService: AuthService, private router: Router ) {
    this.authService.users$.subscribe({
      next: ( user ) => {
        this.currentUserEmail = user?.email;
        this.isLoggedIn = !!user
        console.log('current user = ', this.isLoggedIn )
      }
    })

  }


  signOutUser() {
    this.authService.signOut().then(() => {
      console.log('current user = ', this.isLoggedIn )
    })
    .catch( err => {
      console.error( 'sign out error, ', err)
    })
  }


  navigateToLogin() {
    this.router.navigate(['sign-in'])
  }

  
  navigateToHome() {
    this.router.navigate(['/'])
  }


}
