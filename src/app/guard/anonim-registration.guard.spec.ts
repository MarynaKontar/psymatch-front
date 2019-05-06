import { TestBed, async, inject } from '@angular/core/testing';

import { AnonimRegistrationGuard } from './anonim-registration.guard';

describe('AnonimRegistrationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonimRegistrationGuard]
    });
  });

  it('should ...', inject([AnonimRegistrationGuard], (guard: AnonimRegistrationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
