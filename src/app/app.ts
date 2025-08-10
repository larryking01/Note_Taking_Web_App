import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorBanner } from './components/error-banner/error-banner';
import { ToastBanner } from './components/toast-banner/toast-banner';
import { ThemeService } from './services/themes/theme-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorBanner, ToastBanner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'Notopia';

  themeService = inject( ThemeService )

  ngOnInit(): void {
    this.initializeSelectedTheme()
    this.initializeSelectedFont()
  }


  initializeSelectedTheme() {
    const savedTheme = localStorage.getItem('preferred-theme') || ''
    document.body.classList.remove('dark', 'green')
    if( savedTheme ) {
      document.body.classList.add( savedTheme )
    }

  }


  initializeSelectedFont() {
    const savedFont = this.themeService.getSavedFont()
    if( savedFont ) {
      document.body.classList.remove('sans', 'sans-serif', 'monospace')
      document.body.classList.add( savedFont )
    }
    else {
      document.body.classList.add('sans')
    }
  }

}
