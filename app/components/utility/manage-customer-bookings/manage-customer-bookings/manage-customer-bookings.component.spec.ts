import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomerBookingsComponent } from './manage-customer-bookings.component';

describe('ManageCustomerBookingsComponent', () => {
  let component: ManageCustomerBookingsComponent;
  let fixture: ComponentFixture<ManageCustomerBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCustomerBookingsComponent]
    });
    fixture = TestBed.createComponent(ManageCustomerBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
