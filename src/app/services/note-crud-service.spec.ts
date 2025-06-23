import { TestBed } from '@angular/core/testing';

import { NoteCrudService } from './note-crud-service';

describe('NoteCrudService', () => {
  let service: NoteCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
