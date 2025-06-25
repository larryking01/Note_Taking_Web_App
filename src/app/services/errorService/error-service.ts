import { Injectable, WritableSignal, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  errorMessage = signal<string | null>( null )


  handleError(error: string, duration = 3000) {
    this.errorMessage.set( error )

    setTimeout(() => {
      this.errorMessage.set( null )
      
    }, duration)

  }


  clearErrorMessage() {
    this.errorMessage.set( null )
  }




}
