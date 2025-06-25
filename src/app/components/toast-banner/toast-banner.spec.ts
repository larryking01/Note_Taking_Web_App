import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastBanner } from './toast-banner';

describe('ToastBanner', () => {
  let component: ToastBanner;
  let fixture: ComponentFixture<ToastBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
