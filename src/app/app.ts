import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Note_Taking_Web_App';
}
