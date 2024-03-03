import { TestBed } from '@angular/core/testing';

import { FlightOwnerDashboardService } from './flight-owner-dashboard.service';

describe('FlightOwnerDashboardService', () => {
  let service: FlightOwnerDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightOwnerDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
