import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFormsComponent } from './flight-forms.component';

describe('FlightFormsComponent', () => {
  let component: FlightFormsComponent;
  let fixture: ComponentFixture<FlightFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightFormsComponent]
    });
    fixture = TestBed.createComponent(FlightFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
