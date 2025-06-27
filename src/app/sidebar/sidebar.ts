import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoteCrudService } from '../services/notesCRUD/note-crud-service';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule, CommonModule ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar  {

  router = inject( Router )

  fontType: string = 'sans';
  
  themeType: string = '';

  lightMode: boolean = true;

  notesService = inject( NoteCrudService )

  toggleTheme() {
    this.lightMode = !this.lightMode
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
