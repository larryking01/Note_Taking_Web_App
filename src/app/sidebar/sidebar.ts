import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [],
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

}
