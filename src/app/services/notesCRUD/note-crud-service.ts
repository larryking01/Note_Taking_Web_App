import { Injectable, inject } from '@angular/core';
import { NoteInterface } from '../../models/noteInterface';
import { BehaviorSubject } from 'rxjs'
import { Firestore, collection, addDoc, CollectionReference } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../authentication/auth-service';



@Injectable({
  providedIn: 'root'
})
export class NoteCrudService {
  private AllNotesArray = new BehaviorSubject<NoteInterface[]>([])
  AllNotesArray$ = this.AllNotesArray.asObservable()

  private firestore = inject( Firestore )
  private auth = inject( Auth )

  // currentUserEmail: string | null | undefined = null;

  
  private notesReference: CollectionReference = collection( this.firestore, 'Notes') as CollectionReference;




  // authService = inject( AuthService )

  // constructor( private authService: AuthService ) {
  //   this.authService.users$.subscribe({
  //     next: ( user ) => {
  //       this.currentUserEmail = user?.email;
  //     }
  //   })

  // }


  async createNewNote( note: NoteInterface ) {
    const currentUser = this.auth.currentUser;

    if(!currentUser?.email) {
      throw new Error('User not authenticated')
    }
    else {
      const newNote: NoteInterface = {
        ...note
      }

      await addDoc( this.notesReference, newNote )
      console.log("note created = ", newNote)
    }
    
  }


  fetchAllNotes() {

  }


  fetchNote( note: NoteInterface ) {

  }


  updateNote( note: NoteInterface ) {

  }


  deleteNote( note: NoteInterface) {

  }


  archiveNote( note: NoteInterface ) {

  }



   


}
