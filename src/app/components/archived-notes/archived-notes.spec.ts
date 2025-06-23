import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedNotes } from './archived-notes';

describe('ArchivedNotes', () => {
  let component: ArchivedNotes;
  let fixture: ComponentFixture<ArchivedNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
