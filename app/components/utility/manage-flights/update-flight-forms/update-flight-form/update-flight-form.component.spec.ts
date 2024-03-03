import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFlightFormComponent } from './update-flight-form.component';

describe('UpdateFlightFormComponent', () => {
  let component: UpdateFlightFormComponent;
  let fixture: ComponentFixture<UpdateFlightFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFlightFormComponent]
    });
    fixture = TestBed.createComponent(UpdateFlightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
