import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  constructor() { }


  setFont(selectedFont: string) {
    document.body.classList.remove('sans', 'sans-serif', 'monospace')
    document.body.classList.add( selectedFont )
    localStorage.setItem("preferred-font", selectedFont)
  }


  getSavedFont() {
    const savedFont = localStorage.getItem('preferred-font')
    return savedFont
  }


  deleteSavedFont() {
    localStorage.removeItem('preferred-font')
  }


}
