import { TestBed, inject } from '@angular/core/testing';

import { MatchValueCompatibilityService } from './match-value-compatibility.service';

describe('MatchValueCompatibilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchValueCompatibilityService]
    });
  });

  it('should be created', inject([MatchValueCompatibilityService], (service: MatchValueCompatibilityService) => {
    expect(service).toBeTruthy();
  }));
});
