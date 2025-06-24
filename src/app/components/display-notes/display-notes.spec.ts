import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNotes } from './display-notes';

describe('DisplayNotes', () => {
  let component: DisplayNotes;
  let fixture: ComponentFixture<DisplayNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
