import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { NoteInterface } from '../../models/noteInterface';
import { BehaviorSubject } from 'rxjs'
import { Firestore, collection, addDoc, CollectionReference, getDoc,
         getDocs, collectionData, docData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { Observable, switchMap, of, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NoteCrudService {
  private AllNotesArray = new BehaviorSubject<NoteInterface[]>([])
  AllNotesArray$ = this.AllNotesArray.asObservable()

  private totalNotesCount = new BehaviorSubject<number>(0)
  totalNotesCount$ = this.totalNotesCount.asObservable() 

  private totalActiveNotesCount = new BehaviorSubject<number>(0)
  totalActiveNotesCount$ = this.totalActiveNotesCount.asObservable()

  private totalArchivedNotesCount = new BehaviorSubject<number>(0)
  totalArchivedNotesCount$ = this.totalArchivedNotesCount.asObservable()

  private firestore = inject( Firestore )
  private auth = inject( Auth )


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


  /** Get a single note reactively by note ID for the logged-in user */
  getUserNoteById(noteId: string): Observable<NoteInterface | null> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user?.email){
          console.warn('User not logged in yet')
          return of(null);        
        } 
        else {
          const noteRef = doc(this.firestore, `Users/${user.email}/notes/${noteId}`);
          console.log('from service, note id = ', noteId )
          return docData(noteRef, { idField: 'id' }) as Observable<NoteInterface>;
        }
      })
    );
  }



  async updateUserNote(noteId: string, updatedData: Partial<NoteInterface>): Promise<void> {
    const user = this.auth.currentUser;
    if (!user?.email) {
      throw new Error('User not authenticated');
    }
    else {
      const noteRef = doc(this.firestore, `Users/${user.email}/notes/${noteId}`);
      await updateDoc(noteRef, updatedData);
    }

  }


  async deleteUserNote(noteId: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user?.email) {
      throw new Error('User not authenticated');
    }
    else {
      const noteRef = doc(this.firestore, `Users/${user.email}/notes/${noteId}`);
      await deleteDoc(noteRef);
    }

  }


  async toggleArchive(noteId: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user?.email) throw new Error('User not authenticated');

    const noteRef = doc(this.firestore, `Users/${user.email}/notes/${noteId}`);

    const snapshot = await getDoc(noteRef);
    if (!snapshot.exists()) throw new Error('Note not found');

    const currentIsArchived = snapshot.data()['isArchived'];

    await updateDoc(noteRef, {
      isArchived: !currentIsArchived
    });

  }



  getTotalNotesCount() {
    this.getUserNotesRealTime().subscribe({
      next: ( notes ) => {
        this.totalNotesCount.next( notes.length )
      }
    })
  }


  getTotalActiveNotesCount() {
    this.getUserNotesRealTime().pipe(
      map( notes => notes.filter( note => note.isArchived === false ))
    )
    .subscribe({
      next: ( activeNotes ) => {
        this.totalActiveNotesCount.next( activeNotes.length )
      }
    })
  }
  

  getTotalArchivedNotesCount() {
    this.getUserNotesRealTime().pipe(
      map( notes => notes.filter( note => note.isArchived === true ))
    )
    .subscribe({
      next: ( archivedNotes ) => {
        this.totalArchivedNotesCount.next( archivedNotes.length )
      }
    })
  }

   


}
