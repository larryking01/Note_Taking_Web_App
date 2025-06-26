import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

  router = inject( Router )

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





}
