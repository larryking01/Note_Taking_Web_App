import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { NoteInterface } from '../../models/noteInterface';
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


  ngOnInit(): void {
    this.archivedNotes$ = this.noteService.getUserNotesRealTime().pipe(
      map(notes => notes.filter(note => note.isArchived))
    );
  }



}
