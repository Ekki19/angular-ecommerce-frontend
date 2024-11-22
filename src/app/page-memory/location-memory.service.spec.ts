import { TestBed } from '@angular/core/testing';

import { LocationMemoryService } from './location-memory.service';

describe('LocationMemoryService', () => {
  let service: LocationMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
