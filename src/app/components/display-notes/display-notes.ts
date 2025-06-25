import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { Observable } from 'rxjs';
import { NoteInterface } from '../../models/noteInterface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-display-notes',
  imports: [Navbar, CommonModule],
  templateUrl: './display-notes.html',
  styleUrl: './display-notes.scss'
})
export class DisplayNotes implements OnInit {

  notesService = inject( NoteCrudService )

  router = inject( Router )

  allNotes$: Observable<NoteInterface[]> = this.notesService.getUserNotesRealTime()

  AllNotesArray: NoteInterface[] = []


  ngOnInit(): void {
    this.notesService.getUserNotesRealTime().subscribe({
      next: ( data => { 
        this.AllNotesArray = data
        console.log("all notes fetched = ", this.AllNotesArray)
       })
    })
  }


  navigateToCreateNote() {
    this.router.navigate(['create'])
  }

  navigateToEditNote(note: NoteInterface) {
    // this.router.navigate(['edit-note'])
    console.log("selected note = ", note)
    this.router.navigate(['edit-note', note.id ])

  }



}
