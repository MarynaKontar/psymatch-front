import { TestBed, inject } from '@angular/core/testing';

import { SendingTokensService } from './sending-tokens.service';

describe('SendingTokensService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendingTokensService]
    });
  });

  it('should be created', inject([SendingTokensService], (service: SendingTokensService) => {
    expect(service).toBeTruthy();
  }));
});
