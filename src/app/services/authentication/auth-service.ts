import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User, authState,
         UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject( Auth )

  users$: Observable<User | null> = authState( this.auth )

  constructor() { }


  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword( this.auth, email, password)
  }


  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password)
  }


  signOut(): Promise<void> {
    return this.auth.signOut()
  }


  /* reactive check for if user is logged in or not */
  isLoggedIn(): Observable<boolean> {
    return new Observable(( observer ) => {
      onAuthStateChanged( this.auth, ( user ) => {
        observer.next(!!user)
      })
    })
  }


  /* one time check, not reactive */
  getCurrentUser(): User | null {
    return this.auth.currentUser
  }


  /* get the currently logged in user's email */
  // getUserEmail(): Observable<string | null> {
  //   return new Observable(observer => {
  //     this.userEmail$.subscribe(user => {
  //       observer.next(user?.email ?? null);
  //     });
  //   });
  // }






}
