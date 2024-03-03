import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightOwnerDashboardComponent } from './flight-owner-dashboard.component';

describe('FlightOwnerDashboardComponent', () => {
  let component: FlightOwnerDashboardComponent;
  let fixture: ComponentFixture<FlightOwnerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightOwnerDashboardComponent]
    });
    fixture = TestBed.createComponent(FlightOwnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
