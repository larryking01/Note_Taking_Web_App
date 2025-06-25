import { Component } from '@angular/core';
import { Sidebar } from '../../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';


@Component({
  selector: 'app-archived-notes',
  imports: [Sidebar, Navbar],
  templateUrl: './archived-notes.html',
  styleUrl: './archived-notes.scss'
})
export class ArchivedNotes {

}
