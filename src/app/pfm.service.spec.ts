import { TestBed } from '@angular/core/testing';

import { PfmService } from './pfm.service';

describe('PfmService', () => {
  let service: PfmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
