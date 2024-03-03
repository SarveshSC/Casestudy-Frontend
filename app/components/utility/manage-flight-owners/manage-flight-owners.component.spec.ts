import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFlightOwnersComponent } from './manage-flight-owners.component';

describe('ManageFlightOwnersComponent', () => {
  let component: ManageFlightOwnersComponent;
  let fixture: ComponentFixture<ManageFlightOwnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFlightOwnersComponent]
    });
    fixture = TestBed.createComponent(ManageFlightOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
