import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth-service';
import { SidebarResponsiveness } from '../../services/sidebar/sidebar-responsiveness';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { ThemeService } from '../../services/themes/theme-service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule, CommonModule, FormsModule ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar  implements OnInit {

  fontType: string | null = null;
  themeType: string = '';   
  lightMode: boolean = true;

  isSmallScreen: boolean = false;

  isLoggedIn: boolean = false

  currentUserEmail: string | null | undefined = null;


  totalNotesCount = 0
  activeNotesCount = 0
  archivedNotesCount = 0

  router = inject( Router )
  sidebarService = inject( SidebarResponsiveness )
  noteCRUDService = inject( NoteCrudService )
  themeService = inject( ThemeService )
  authService = inject( AuthService )

  ngOnInit(): void {
    window.addEventListener('resize', this.checkScreenSize.bind(this))
    this.checkScreenSize()
    this.calculateNoteStatistics()
    this.initializeFontType()
    this.displayCurrentUserInfo()
  }


  displayCurrentUserInfo() {
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
      this.router.navigate(['/'])
    })
    .catch( err => {
      console.error( 'sign out error, ', err)
    })
  }


  calculateNoteStatistics() {
    this.noteCRUDService.getTotalNotesCount()
    this.noteCRUDService.getTotalActiveNotesCount()
    this.noteCRUDService.getTotalArchivedNotesCount()

    combineLatest([
      this.noteCRUDService.totalNotesCount$,
      this.noteCRUDService.totalActiveNotesCount$,
      this.noteCRUDService.totalArchivedNotesCount$
    ])
    .subscribe({
      next: ([ totalNotes, totalActiveNotes, totalArchivedNotes]) => {
        this.totalNotesCount = totalNotes
        this.activeNotesCount = totalActiveNotes,
        this.archivedNotesCount = totalArchivedNotes
      }
    })

  }


  initializeFontType() {
    const currentFont = this.themeService.getSavedFont()
    if( currentFont ) {
      this.fontType = currentFont
    }
    else {
      this.fontType = 'sans'
    }

  }


  toggleTheme() {
    this.lightMode = !this.lightMode
  }

  hideSidebar() {
    this.sidebarService.setShowSidebarFalse()
  }

  handleKeyDown(event: KeyboardEvent, route: string) {
    if( event.key === 'Enter' || event.key === ' ') {
      this.navigateTo( route )
    }
  }


  navigateTo( route: string ) {
    this.router.navigate([ route ])
  }

  checkScreenSize() {
    console.log( "screen width =", window.innerWidth )
    this.isSmallScreen = window.innerWidth <= 800
    console.log("small screen = ", this.isSmallScreen)
    if( this.isSmallScreen ) {
      this.sidebarService.setShowSidebarFalse()
    }
    else {
      this.sidebarService.setShowSidebarTrue()
    }

  }
  



  setThemeLight() {
    this.toggleTheme()
    this.themeType = 'light'
    document.body.classList.remove('dark', 'green')
    localStorage.setItem('preferred-theme', '')
    
  }


  setThemeDark() {
    this.toggleTheme()
    this.themeType = 'dark'
    document.body.classList.remove('dark', 'green')
    document.body.classList.add(this.themeType)
    console.log( document.body.classList )
    localStorage.setItem('preferred-theme', this.themeType)

  }


  setThemeGreen() {
    this.toggleTheme()
    this.themeType = 'green'
    document.body.classList.remove('dark', 'green')
    document.body.classList.add(this.themeType)
    console.log( document.body.classList )
    localStorage.setItem('preferred-theme', this.themeType)
    
  }


  setPreferredFont(font: string) {
    this.themeService.setFont(font)
  }



  // calculateTotalNotes() {
  //   this.noteCRUDService.getTotalNotesCount()
  //   this.noteCRUDService.totalNotesCount$.subscribe({
  //     next: ( totalNotes ) => {
  //       this.totalNotesCount = totalNotes
  //     }
  //   })
  // }


  // calculateTotalActiveNotes() {
  //   this.noteCRUDService.getTotalActiveNotesCount()
  //   this.noteCRUDService.totalActiveNotesCount$.subscribe({
  //     next: ( totalActiveNotes ) => {
  //       this.activeNotesCount = totalActiveNotes
  //     }
  //   })
  // }


  // calculateTotalArchivedNotes() {
  //   this.noteCRUDService.getTotalArchivedNotesCount()
  //   this.noteCRUDService.totalArchivedNotesCount$.subscribe({
  //     next: ( totalArchivedNotes ) => {
  //       this.archivedNotesCount = totalArchivedNotes
  //     }
  //   })
  // }

}
