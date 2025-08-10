import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarResponsiveness } from '../../services/sidebar/sidebar-responsiveness';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule, CommonModule, FormsModule ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar  implements OnInit {


  fontType: string = 'sans';
  themeType: string = '';
  lightMode: boolean = true;

  totalNotesCount = 0
  activeNotesCount = 0
  archivedNotesCount = 0

  router = inject( Router )
  sidebarService = inject( SidebarResponsiveness )
  noteCRUDService = inject( NoteCrudService )

  ngOnInit(): void {
    this.calculateNoteStatistics()
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


  toggleTheme() {
    this.lightMode = !this.lightMode
  }

  hideSidebar() {
    this.sidebarService.setShowSidebarFalse()
  }


  navigateToCreateNote() {
    this.router.navigate(['create'])
    
  }

  navigateToHome() {
    this.router.navigate(['/'])
  }

  navigateToArchived() {
    this.router.navigate(['archived'])
  }

  handleKeyDown(event: KeyboardEvent, route: string) {
    if( event.key === 'Enter' || event.key === ' ') {
      this.navigateTo( route )
    }
  }


  navigateTo( route: string ) {
    this.router.navigate([ route ])
  }

  setFont() {
    console.log('font type = ', this.fontType)
    document.body.classList.remove('sans', 'sans-serif', 'monospace')
    localStorage.setItem("preferred-font", this.fontType)
    console.log('saved font = ', localStorage.getItem('preferred-font'))
    document.body.classList.add( this.fontType )
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
