import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAirportsFormComponent } from './update-airports-form.component';

describe('UpdateAirportsFormComponent', () => {
  let component: UpdateAirportsFormComponent;
  let fixture: ComponentFixture<UpdateAirportsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAirportsFormComponent]
    });
    fixture = TestBed.createComponent(UpdateAirportsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
