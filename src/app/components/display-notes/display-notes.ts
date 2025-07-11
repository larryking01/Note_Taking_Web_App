import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { Observable } from 'rxjs';
import { NoteInterface } from '../../models/noteInterface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidebar } from "../../sidebar/sidebar";
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/successToast/toast-service';
import { ErrorService } from '../../services/errorService/error-service';

@Component({
  selector: 'app-display-notes',
  imports: [Navbar, CommonModule, Sidebar, FormsModule],
  templateUrl: './display-notes.html',
  styleUrl: './display-notes.scss'
})
export class DisplayNotes implements OnInit {

  notesService = inject( NoteCrudService )

  router = inject( Router )

  toastService = inject( ToastService )

  errorService = inject( ErrorService )

  allNotes$: Observable<NoteInterface[]> = this.notesService.getUserNotesRealTime()

  AllNotesArray: NoteInterface[] = []

  filteredNotes: NoteInterface[] = []

  searchQuery: string = '';

  selectedNoteID: string = ''

  ngOnInit(): void {
    this.notesService.getUserNotesRealTime().subscribe({
      next: ( data => { 
        this.AllNotesArray = data
        this.notesService.totalNotes.set( this.AllNotesArray.length )
        this.filterNotes()
        this.filterNotesOnArchiveStatus()
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


  filterNotesOnArchiveStatus(): void {
    this.filteredNotes = this.AllNotesArray.filter( note => note.isArchived === false )
    this.notesService.totalArchivedNotes.set( this.AllNotesArray.length - this.filteredNotes.length )
  }


  archiveNote( note: NoteInterface ): void {
    this.selectedNoteID = note.id
    this.notesService.toggleArchive(this.selectedNoteID)
      .then(() => {
        this.toastService.handleSuccess("Note added to archives")
        this.filterNotesOnArchiveStatus()
      })
      .catch(err => {
        this.errorService.handleError("Oops! We hit a snag. Please refresh or try again shortly")
      });
  }


  unarchiveNote( note: NoteInterface ): void {
    this.selectedNoteID = note.id
    this.notesService.toggleArchive(this.selectedNoteID)
      .then(() => {
        this.toastService.handleSuccess("Note removed from archives")
      })
      .catch(err => {
        this.errorService.handleError("Oops! We hit a snag. Please refresh or try again shortly")
      });
  }

}
