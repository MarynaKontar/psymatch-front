import { MatchingModule } from './matching.module';

describe('MatchingModule', () => {
  let matchingModule: MatchingModule;

  beforeEach(() => {
    matchingModule = new MatchingModule();
  });

  it('should create an instance', () => {
    expect(matchingModule).toBeTruthy();
  });
});
