import { TestBed } from '@angular/core/testing';

import { SidebarResponsiveness } from './sidebar-responsiveness';

describe('SidebarResponsiveness', () => {
  let service: SidebarResponsiveness;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarResponsiveness);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
