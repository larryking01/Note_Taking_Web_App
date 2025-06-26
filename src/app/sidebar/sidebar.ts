import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule, CommonModule ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit {

  router = inject( Router )

  fontType: string = 'sans';
  
  themeType: string = '';

  lightMode: boolean = true;

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
    document.body.classList.remove('serif', 'sans-serif', 'monospace')
    document.body.classList.add( this.fontType )
  }


  ngOnInit(): void {
    this.setFont( this.fontType )
  }

  // setFontSerif() {
  //   this.fontType = 'serif'
  //   console.log('font type = ', this.fontType)
  //   document.body.classList.remove('serif', 'sans-serif', 'monospace')
  //   document.body.classList.add( this.fontType )
  // }



  // setFontSansSerif() {
  //   this.fontType = 'sans-serif'
  //   console.log('font type = ', this.fontType)
  //   document.body.classList.remove('serif', 'sans-serif', 'monospace')
  //   document.body.classList.add( this.fontType )
  // }

  // setFontMonospace() {
  //   this.fontType = 'monospace'
  //   console.log('font type = ', this.fontType)
  //   document.body.classList.remove('serif', 'sans-serif', 'monospace')
  //   document.body.classList.add( this.fontType )
  // }


  setThemeDark() {
    this.toggleTheme()
    this.themeType = 'dark'
    document.body.classList.add('dark')
    console.log( document.body.classList )

  }


  setThemeLight() {
    this.toggleTheme()
    this.themeType = 'light'
    document.body.classList.remove('dark')
    // document.body.classList.add('light')
    
  }



}
