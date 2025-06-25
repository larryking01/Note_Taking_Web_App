import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { Observable } from 'rxjs';
import { NoteInterface } from '../../models/noteInterface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidebar } from "../../sidebar/sidebar";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-display-notes',
  imports: [Navbar, CommonModule, Sidebar, FormsModule],
  templateUrl: './display-notes.html',
  styleUrl: './display-notes.scss'
})
export class DisplayNotes implements OnInit {

  notesService = inject( NoteCrudService )

  router = inject( Router )

  allNotes$: Observable<NoteInterface[]> = this.notesService.getUserNotesRealTime()

  AllNotesArray: NoteInterface[] = []

  filteredNotes: NoteInterface[] = []

  searchQuery: string = '';

  ngOnInit(): void {
    this.notesService.getUserNotesRealTime().subscribe({
      next: ( data => { 
        this.AllNotesArray = data
        this.filterNotes()
       })
    })
  }

  
  navigateToEditNote(note: NoteInterface) {
    // this.router.navigate(['edit-note'])
    console.log("selected note = ", note)
    this.router.navigate(['edit-note', note.id ])

  }


  filterNotes(): void {
    const query = this.searchQuery.toLocaleLowerCase()

    this.filteredNotes = this.AllNotesArray.filter( note => 
      note.title.toLowerCase().includes( query ) ||
      note.content.toLowerCase().includes( query ) ||
      note.tag.toLocaleLowerCase().includes( query )
    )

  }



}
