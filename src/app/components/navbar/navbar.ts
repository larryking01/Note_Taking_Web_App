import { Component, Input, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/authentication/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';


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

  notesService = inject( NoteCrudService )

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
    console.log( window.innerWidth <= 600 )
    this.isSmallScreen = window.innerWidth <= 600
    if( this.isSmallScreen ) {
      this.notesService.setShowSidebarFalse()
    }
    else {
      this.notesService.setShowSidebarTrue()
    }

  }


  showSidebar() {
    this.notesService.setShowSidebarTrue()
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
