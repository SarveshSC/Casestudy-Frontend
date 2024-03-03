import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTripFormsComponent } from './update-trip-forms.component';

describe('UpdateTripFormsComponent', () => {
  let component: UpdateTripFormsComponent;
  let fixture: ComponentFixture<UpdateTripFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTripFormsComponent]
    });
    fixture = TestBed.createComponent(UpdateTripFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
