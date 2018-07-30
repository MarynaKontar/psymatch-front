import { TestBed, inject } from '@angular/core/testing';

import { ValueCompatibilityService } from './value-compatibility.service';

describe('ValueCompatibilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueCompatibilityService]
    });
  });

  it('should be created', inject([ValueCompatibilityService], (service: ValueCompatibilityService) => {
    expect(service).toBeTruthy();
  }));
});
