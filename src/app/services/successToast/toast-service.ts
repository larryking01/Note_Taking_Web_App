import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  successMessage = signal<string | null>( null )


  handleSuccess(message: string, duration = 3000) {
    this.successMessage.set( message )

    setTimeout(() => {
      this.successMessage.set( null )

    }, duration)
  }


  clearToast() {
    this.successMessage.set( null )
  }





}
