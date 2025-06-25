import { Component } from '@angular/core';
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
export class App {
  protected title = 'Note_Taking_Web_App';
}
