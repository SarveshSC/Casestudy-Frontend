import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirportsFormComponent } from './add-airports-form.component';

describe('AddAirportsFormComponent', () => {
  let component: AddAirportsFormComponent;
  let fixture: ComponentFixture<AddAirportsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAirportsFormComponent]
    });
    fixture = TestBed.createComponent(AddAirportsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
