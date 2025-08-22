import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss'
})
export class EmptyState {
  @Input() emptyMessage: string = 'You don’t have any content yet. Start by creating your first one!'



}
