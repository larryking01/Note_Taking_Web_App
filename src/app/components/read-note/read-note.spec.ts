import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadNote } from './read-note';

describe('ReadNote', () => {
  let component: ReadNote;
  let fixture: ComponentFixture<ReadNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadNote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
