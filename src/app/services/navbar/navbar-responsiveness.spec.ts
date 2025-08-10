import { TestBed } from '@angular/core/testing';

import { NavbarResponsiveness } from './navbar-responsiveness';

describe('NavbarResponsiveness', () => {
  let service: NavbarResponsiveness;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarResponsiveness);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
