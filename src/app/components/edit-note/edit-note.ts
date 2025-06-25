import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { NoteInterface } from '../../models/noteInterface';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-note',
  imports: [Navbar, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-note.html',
  styleUrl: './edit-note.scss'
})
export class EditNote implements OnInit, OnDestroy {

  activatedRoute = inject( ActivatedRoute )

  router = inject( Router )

  selectedNoteID: string = ''

  noteService = inject( NoteCrudService )

  // type later
  noteSubscription: any

  // type this later
  userNote$!: Observable<NoteInterface | null>

  noteForm: FormGroup = new FormGroup({
    noteTitle: new FormControl('', Validators.required),
    noteContent: new FormControl('', Validators.required),
    noteTag: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
    this.selectedNoteID = this.activatedRoute.snapshot.paramMap.get('id')!
    this.userNote$ = this.noteService.getUserNoteById( this.selectedNoteID )
    console.log("selected note id = ", this.selectedNoteID)
    console.log('selected note = ', this.userNote$)

    this.noteSubscription = this.userNote$.subscribe({
      next: ( note => {
        this.noteForm.patchValue({
          noteTitle: note?.title,
          noteContent: note?.content,
          noteTag: note?.tag
        })
      })
    })

  }

  ngOnDestroy(): void {
    this.noteSubscription?.unsubscribe()
  }


  updateNote(): void {
    if (this.noteForm.invalid || !this.selectedNoteID) {
      return;
    }
    else {
      const { noteTitle, noteContent, noteTag } = this.noteForm.value;

      this.noteService.updateUserNote(this.selectedNoteID, {
        title: noteTitle,
        content: noteContent,
        tag: noteTag
      })
      .then(() => {
        console.log('Note updated successfully');
        // Optionally show a toast or navigate
      })
      .catch(err => {
        console.error('Error updating note:', err);
      });
      }

  }


  deleteNote(): void {
    if (!this.selectedNoteID) return;

    const confirmed = confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    this.noteService.deleteUserNote(this.selectedNoteID)
      .then(() => {
        console.log('Note deleted successfully');
        this.router.navigate(['/']); // redirect to notes dashboar
      })
      .catch(err => {
        console.error('Error deleting note:', err);
    });
  }



  archiveNote(): void {
    if (!this.selectedNoteID) return;

    this.noteService.toggleArchive(this.selectedNoteID)
      .then(() => {
        console.log('Archive state toggled');
      })
      .catch(err => {
        console.error('Error archiving note:', err);
      });
  }










}
