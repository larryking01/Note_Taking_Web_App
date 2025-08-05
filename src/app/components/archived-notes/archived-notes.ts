import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { NoteInterface } from '../../models/noteInterface';
import { ToastService } from '../../services/successToast/toast-service';
import { ErrorService } from '../../services/errorService/error-service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-archived-notes',
  imports: [Sidebar, Navbar, CommonModule],
  templateUrl: './archived-notes.html',
  styleUrl: './archived-notes.scss'
})
export class ArchivedNotes implements OnInit {
  archivedNotes$!: Observable<NoteInterface[]>;


  noteService = inject( NoteCrudService )

  errorService = inject( ErrorService )

  toastService = inject( ToastService )

  selectedNoteID: string = ''


  ngOnInit(): void {
    this.archivedNotes$ = this.noteService.getUserNotesRealTime().pipe(
      map(notes => notes.filter(note => note.isArchived))
    );
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



}
