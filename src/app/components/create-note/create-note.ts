import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteInterface } from '../../models/noteInterface';
import { Navbar } from "../navbar/navbar";
import { Sidebar } from '../../sidebar/sidebar';
import { AuthService } from '../../services/authentication/auth-service';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/errorService/error-service';
import { ToastService } from '../../services/successToast/toast-service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-create-note',
  imports: [ReactiveFormsModule, CommonModule, Navbar, Sidebar],
  templateUrl: './create-note.html',
  styleUrl: './create-note.scss'
})
export class CreateNote {

  currentUserEmail: string | null | undefined = null;

  constructor( private authService: AuthService, private router: Router, 
               private noteCrudService: NoteCrudService, private errorService: ErrorService,
               private toastService: ToastService,
              private location: Location ) {
    this.authService.users$.subscribe({
      next: ( user ) => {
        this.currentUserEmail = user?.email;
      }
    })

  }


  noteForm: FormGroup = new FormGroup({
    noteTitle: new FormControl('', Validators.required),
    noteContent: new FormControl('', Validators.required),
    noteTag: new FormControl('', Validators.required)
  })


  goBack() {
    this.location.back()
  }



  createNewNote() {
    if( this.noteForm.invalid ) {
      this.noteForm.markAllAsTouched()
      this.errorService.handleError("Hang on — a few required details are missing. You’re almost there!")
      return
    }
    else {
      const { noteTitle, noteContent, noteTag } = this.noteForm.value
      let newNote: NoteInterface = {
        id: '100',
        user: this.currentUserEmail!,
        title: noteTitle,
        content: noteContent,
        tag: noteTag,
        isArchived: false,
        createdAt: new Date().toLocaleDateString()
      }
      this.noteCrudService.createNewNote( newNote )
      this.toastService.handleSuccess("Note added successfully")
    }

  }



}
