import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  constructor() { }


  setFont(selectedFont: string) {
    console.log('font type = ', selectedFont)
    document.body.classList.remove('sans', 'sans-serif', 'monospace')
    document.body.classList.add( selectedFont )
    localStorage.setItem("preferred-font", selectedFont)
    console.log('saved font in local storage = ', localStorage.getItem('preferred-font'))
  }


  getSavedFont() {
    const savedFont = localStorage.getItem('preferred-font')
    return savedFont
  }


  deleteSavedFont() {
    localStorage.removeItem('preferred-font')
  }


}
