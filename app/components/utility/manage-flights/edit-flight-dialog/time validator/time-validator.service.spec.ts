import { TestBed } from '@angular/core/testing';

import { TimeValidatorService } from './time-validator.service';

describe('TimeValidatorService', () => {
  let service: TimeValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
