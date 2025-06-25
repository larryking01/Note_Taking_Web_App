import { Injectable, inject } from '@angular/core';
import { NoteInterface } from '../../models/noteInterface';
import { BehaviorSubject } from 'rxjs'
import { Firestore, collection, addDoc, CollectionReference, getDocs, collectionData } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { Observable, switchMap, of } from 'rxjs';
import { AuthService } from '../authentication/auth-service';
import { query } from 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class NoteCrudService {
  private AllNotesArray = new BehaviorSubject<NoteInterface[]>([])
  AllNotesArray$ = this.AllNotesArray.asObservable()

  private firestore = inject( Firestore )
  private auth = inject( Auth )

  // currentUserEmail: string | null | undefined = null;

  




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
      const notesReference: CollectionReference = collection( this.firestore, `Users/${ currentUser.email }/notes`) as CollectionReference;
      const newNote: NoteInterface = {
        ...note
      }

      await addDoc( notesReference, newNote )
      console.log("note created = ", newNote)
    }
    
  }


  async getUserNotesOnce(): Promise<NoteInterface[]> {
    const user = this.auth.currentUser
    if(!user?.email) {
      return []
    }
    else {
      const notesReference: CollectionReference = collection(this.firestore, `Users/${ user.email }/notes`)
      const querySnapshot = await getDocs( notesReference )

      return querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() }) as NoteInterface )
    }

  }


  getUserNotesRealTime(): Observable<NoteInterface[]> {
    // const user = this.auth.currentUser;
    // if(!user?.email) {
    //   return new Observable()
    // }
    // else {
    //   const notesReference: CollectionReference = collection(this.firestore, `Users/${ user.email }/notes`)
    //   return collectionData( notesReference, { idField: 'id' }) as Observable<NoteInterface[]>
    // }

    return authState( this.auth ).pipe(
      switchMap( user => {
        if(!user?.email) {
          return of([])
        }
        else {
          const notesReference: CollectionReference = collection(this.firestore, `Users/${ user.email }/notes`)
          return collectionData( notesReference, { idField: 'id' }) as Observable<NoteInterface[]>
        }
      })
    )
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
