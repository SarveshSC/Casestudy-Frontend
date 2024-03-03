import { TestBed } from '@angular/core/testing';

import { FlightTripService } from './flight-trip.service';

describe('FlightTripService', () => {
  let service: FlightTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
