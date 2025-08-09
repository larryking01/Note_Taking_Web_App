import { Component, Input, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarResponsiveness } from '../../services/sidebar/sidebar-responsiveness';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  // encapsulation: ViewEncapsulation.None
})
export class Navbar implements OnInit {
  @Input() pageTitle: string = ''

  isLoggedIn: boolean = false

  currentUserEmail: string | null | undefined = null;

  sidebarService = inject( SidebarResponsiveness )

  isSmallScreen: boolean = false;


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


  ngOnInit(): void {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize.bind( this ))
  }


  checkScreenSize() {
    console.log( window.innerWidth <= 800 )
    this.isSmallScreen = window.innerWidth <= 800
    if( this.isSmallScreen ) {
      this.sidebarService.setShowSidebarFalse()
    }
    else {
      this.sidebarService.setShowSidebarTrue()
    }

  }


  showSidebar() {
    this.sidebarService.setShowSidebarTrue()
  }


  signOutUser() {
    this.authService.signOut().then(() => {
      console.log('current user = ', this.isLoggedIn )
      this.router.navigate(['/'])
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
