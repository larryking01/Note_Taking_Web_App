import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarResponsiveness } from '../../services/sidebar/sidebar-responsiveness';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { map } from 'rxjs'


@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule, CommonModule ],
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
    this.getTotalUserNotesCount()
    this.getTotalActiveNotesCount()
    this.getTotalArchivedNotes()
    this.archivedNotesCount = this.noteCRUDService.totalArchivedNotes()
  }


  getTotalUserNotesCount() {
    this.noteCRUDService.getUserNotesRealTime().subscribe({
      next: ( data ) => {
        this.totalNotesCount = data.length
      }
    })
  }


  getTotalActiveNotesCount() {
    this.noteCRUDService.getUserNotesRealTime().pipe(
      map( notes => notes.filter( note => note.isArchived === false ))
    )
    .subscribe({
      next: ( data ) => {
        this.activeNotesCount = data.length
      }
    })
  }


  getTotalArchivedNotes() {
    this.noteCRUDService.getUserNotesRealTime().pipe(
      map( notes => notes.filter( note => note.isArchived === true ))
    )
    .subscribe({
      next: ( data ) => {
        this.archivedNotesCount = data.length
      }
    })
  }

  toggleTheme() {
    this.lightMode = !this.lightMode
  }

  hideSidebar() {
    this.sidebarService.setShowSidebarFalse()
  }

  // showCloseSidebarBtn() {
  //   return this.notesService.setShowCloseSidebarBtn()
  // }

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

  setFont(font: string) {
    this.fontType = font
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


}
