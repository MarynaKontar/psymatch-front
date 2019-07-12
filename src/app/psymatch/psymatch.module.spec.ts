import { PsymatchModule } from './psymatch.module';

describe('PsymatchModule', () => {
  let psymatchModule: PsymatchModule;

  beforeEach(() => {
    psymatchModule = new PsymatchModule();
  });

  it('should create an instance', () => {
    expect(psymatchModule).toBeTruthy();
  });
});
