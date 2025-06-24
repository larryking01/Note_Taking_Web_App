import { Injectable } from '@angular/core';
import { NoteInterface } from '../../models/noteInterface';
import { BehaviorSubject } from 'rxjs'




@Injectable({
  providedIn: 'root'
})
export class NoteCrudService {
  private AllNotesArray = new BehaviorSubject<NoteInterface[]>([])
  AllNotesArray$ = this.AllNotesArray.asObservable()

  constructor() { }


  createNewNote( note: NoteInterface ) {

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
