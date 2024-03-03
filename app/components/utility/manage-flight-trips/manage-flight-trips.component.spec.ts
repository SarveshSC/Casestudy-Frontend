import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFlightTripsComponent } from './manage-flight-trips.component';

describe('ManageFlightTripsComponent', () => {
  let component: ManageFlightTripsComponent;
  let fixture: ComponentFixture<ManageFlightTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFlightTripsComponent]
    });
    fixture = TestBed.createComponent(ManageFlightTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
