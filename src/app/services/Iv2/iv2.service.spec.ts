import { TestBed } from '@angular/core/testing';

import { Iv2Service } from './iv2.service';

describe('Iv2Service', () => {
  let service: Iv2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Iv2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
