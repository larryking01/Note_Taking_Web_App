import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { NoteInterface } from '../../models/noteInterface';
import { ToastService } from '../../services/successToast/toast-service';
import { ErrorService } from '../../services/errorService/error-service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { EmptyState } from '../empty-state/empty-state';
import { LoadingState } from '../loading-state/loading-state';


@Component({
  selector: 'app-archived-notes',
  imports: [Sidebar, Navbar, CommonModule, FormsModule, EmptyState, LoadingState],
  templateUrl: './archived-notes.html',
  styleUrl: './archived-notes.scss'
})
export class ArchivedNotes implements OnInit {
  // archivedNotes$!: Observable<NoteInterface[]>;

  noteService = inject( NoteCrudService )

  errorService = inject( ErrorService )

  toastService = inject( ToastService )

  selectedNoteID: string = ''

  ArchivedNotesArray: NoteInterface[] = []
  filteredNotes: NoteInterface[] = []

  searchQuery: string = '';
  isLoading: boolean = true;


  ngOnInit(): void {
    this.noteService.getUserNotesRealTime().pipe(
      map(notes => notes.filter(note => note.isArchived))
    )
    .subscribe({
      next: ( archivedNotes ) => {
        this.isLoading = false
        this.ArchivedNotesArray = archivedNotes
        this.filteredNotes = archivedNotes
      }
    })
    
    
    ;
  }


  unarchiveNote( note: NoteInterface ): void {
    this.selectedNoteID = note.id
    this.noteService.toggleArchive(this.selectedNoteID)
      .then(() => {
        this.toastService.handleSuccess("Note removed from archives")
      })
      .catch(err => {
        this.errorService.handleError("Oops! We hit a snag. Please refresh or try again shortly")
      });
  }


  filterNotes(): void {
    const query = this.searchQuery.toLocaleLowerCase()
    this.filteredNotes = this.ArchivedNotesArray.filter( note => 
      note.title.toLowerCase().includes( query ) ||
      note.content.toLowerCase().includes( query ) ||
      note.tag.toLocaleLowerCase().includes( query )
    )

  }



}
