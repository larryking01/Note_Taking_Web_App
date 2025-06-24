import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteInterface } from '../../models/noteInterface';
// import { noteTag } from '../../models/noteInterface';
import { Navbar } from "../navbar/navbar";
import { AuthService } from '../../services/authentication/auth-service';
import { NoteCrudService } from '../../services/notesCRUD/note-crud-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-note',
  imports: [ReactiveFormsModule, CommonModule, Navbar],
  templateUrl: './create-note.html',
  styleUrl: './create-note.scss'
})
export class CreateNote {

  // tags = Object.entries( noteTag )

  currentUserEmail: string | null | undefined = null;


  noteForm: FormGroup = new FormGroup({
    noteTitle: new FormControl('', Validators.required),
    noteContent: new FormControl('', Validators.required),
    noteTag: new FormControl('', Validators.required)
  })


  constructor( private authService: AuthService, private router: Router, private noteCrudService: NoteCrudService ) {
    this.authService.users$.subscribe({
      next: ( user ) => {
        this.currentUserEmail = user?.email;
      }
    })

  }




  createNewNote() {
    if( this.noteForm.invalid ) {
      this.noteForm.markAllAsTouched()
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
      // console.log( newNote )
    }

  }









}
