import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar  {

  router = inject( Router )

  fontType: string = '';

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


  setFontSerif() {
    this.fontType = 'serif'
    console.log('font type = ', this.fontType)
    document.body.classList.remove('serif', 'sans-serif', 'monospace')
    document.body.classList.add( this.fontType )
  }

  setFontSansSerif() {
    this.fontType = 'sans-serif'
    console.log('font type = ', this.fontType)
    document.body.classList.remove('serif', 'sans-serif', 'monospace')
    document.body.classList.add( this.fontType )
  }

  setFontMonospace() {
    this.fontType = 'monospace'
    console.log('font type = ', this.fontType)
    document.body.classList.remove('serif', 'sans-serif', 'monospace')
    document.body.classList.add( this.fontType )
  }



}
