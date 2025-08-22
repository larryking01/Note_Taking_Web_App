import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NoteInterface } from '../../models/noteInterface';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/errorService/error-service';
import { ToastService } from '../../services/successToast/toast-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-note',
  imports: [Navbar, CommonModule, ReactiveFormsModule, Sidebar],
  templateUrl: './edit-note.html',
  styleUrl: './edit-note.scss'
})
export class EditNote implements OnInit, OnDestroy {

  activatedRoute = inject( ActivatedRoute )

  router = inject( Router )

  location = inject( Location )

  errorService = inject( ErrorService )

  toastService = inject( ToastService )

  selectedNoteID: string = ''

  noteService = inject( NoteCrudService )

  // type later
  noteSubscription: any

  userNote$!: Observable<NoteInterface | null>

  noteForm: FormGroup = new FormGroup({
    noteTitle: new FormControl('', Validators.required),
    noteContent: new FormControl('', Validators.required),
    noteTag: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
    this.selectedNoteID = this.activatedRoute.snapshot.paramMap.get('id')!
    this.userNote$ = this.noteService.getUserNoteById( this.selectedNoteID )

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
    if( this.noteForm.pristine ) {
      this.errorService.handleError("Note has not been edited yet...")
    }
    else if (this.noteForm.invalid || !this.selectedNoteID) {
      this.errorService.handleError("Hang on — a few required details are missing. You’re almost there!")
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
        this.toastService.handleSuccess("Note updated successfully.")
        // this.router.navigate(['view-notes']);
      })
      .catch(err => {
        this.errorService.handleError("Oops! We hit a snag. Please refresh or try again shortly")
      });
      }

  }


  deleteNote(): void {
    if (!this.selectedNoteID) return;

    const confirmed = confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    this.noteService.deleteUserNote(this.selectedNoteID)
      .then(() => {
        this.toastService.handleSuccess("Your note has been removed")
        this.router.navigate(['view-notes']);
      })
      .catch(err => {
        this.errorService.handleError("Oops! We hit a snag. Please refresh or try again shortly")
    });
  }


  goBack() {
    this.location.back()
  }



  archiveNote(): void {
    if (!this.selectedNoteID) return;

    this.noteService.toggleArchive(this.selectedNoteID)
      .then(() => {
        this.toastService.handleSuccess("Note added to archives")
      })
      .catch(err => {
        this.errorService.handleError("Oops! We hit a snag. Please refresh or try again shortly")
      });
  }

  unarchiveNote(): void {
    if (!this.selectedNoteID) return;

    this.noteService.toggleArchive(this.selectedNoteID)
      .then(() => {
        this.toastService.handleSuccess("Note removed from archives")
      })
      .catch(err => {
        this.errorService.handleError("Oops! We hit a snag. Please refresh or try again shortly")
      });
  }

}
