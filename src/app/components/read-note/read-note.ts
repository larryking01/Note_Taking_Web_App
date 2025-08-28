import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NoteInterface } from '../../models/noteInterface';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';


@Component({
  selector: 'app-read-note',
  imports: [ Sidebar, Navbar],
  templateUrl: './read-note.html',
  styleUrl: './read-note.scss'
})
export class ReadNote implements OnInit {

  router = inject( Router )

  activatedRoute = inject( ActivatedRoute )

  noteService = inject( NoteCrudService )

  selectedNoteID: string | null = ''

  private destroyRef = inject( DestroyRef )

  userNote: NoteInterface | null = null




  ngOnInit(): void {
    this.selectedNoteID = this.activatedRoute.snapshot.paramMap.get('id')
    if( this.selectedNoteID ) {
      this.noteService.getUserNoteById( this.selectedNoteID )
      .pipe( takeUntilDestroyed( this.destroyRef ))
      .subscribe({
        next: ( note => {
          this.userNote = note
          console.log('fetched note = ', this.userNote )
        } ) 
      })
    }
  }


  navigateToEditNote() {
    this.router.navigate(['edit-note', this.selectedNoteID ])
  }


}
