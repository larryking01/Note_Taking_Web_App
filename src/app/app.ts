import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorBanner } from './components/error-banner/error-banner';
import { ToastBanner } from './components/toast-banner/toast-banner';
// import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorBanner, ToastBanner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'Note_Taking_Web_App';

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('preferred-theme') || ''
    const savedFont = localStorage.getItem('preferred-font')

    document.body.classList.remove('dark', 'green')
    if( savedTheme ) {
      document.body.classList.add( savedTheme )
    }

    if( savedFont ) {
      console.log('saved font = ', savedFont)
      document.body.classList.remove('sans', 'sans-serif', 'monospace')
      document.body.classList.add( savedFont )
    }

  }

}
