import { TestBed } from '@angular/core/testing';

import { ScratchPadService } from './scratch-pad.service';

describe('ScratchPadService', () => {
  let service: ScratchPadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScratchPadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
