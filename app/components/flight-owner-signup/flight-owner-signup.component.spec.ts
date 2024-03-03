import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightOwnerSignupComponent } from './flight-owner-signup.component';

describe('FlightOwnerSignupComponent', () => {
  let component: FlightOwnerSignupComponent;
  let fixture: ComponentFixture<FlightOwnerSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightOwnerSignupComponent]
    });
    fixture = TestBed.createComponent(FlightOwnerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
